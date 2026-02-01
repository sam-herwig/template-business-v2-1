# Video Tutorial Scripts

*Scripts for setup videos and screen recordings*

---

## Video 1: Complete Setup Guide (5-7 minutes)

### Overview
- **Length:** 5-7 minutes
- **Audience:** Non-technical users
- **Goal:** Get them from purchase to live site

---

### Script

**[0:00 - 0:30] Intro**

*[Screen: Landing page of their new site]*

"Hey! Congrats on your new template. In the next 5 minutes, I'm going to show you how to get your site live with your own content.

No coding required. No terminal commands. Just click a few buttons and you're done.

Let's do this."

---

**[0:30 - 1:30] Step 1: Deploy to Vercel**

*[Screen: GitHub repo page, showing the Deploy button]*

"First, let's get your site online. Click the 'Deploy to Vercel' button right here."

*[Click button, Vercel page opens]*

"If you don't have a Vercel account, click 'Sign up' — it's free and takes 30 seconds. Use your GitHub or email."

*[Show sign-up flow quickly]*

"Now Vercel will ask to create a copy of the template. Click 'Create' and wait about 30 seconds..."

*[Show deployment progress]*

"And we're live! Click 'Visit' to see your site."

*[Show the deployed site]*

"That's it — you have a live website. Now let's add your content."

---

**[1:30 - 3:00] Step 2: Set Up Sanity CMS**

*[Screen: Sanity.io website]*

"To edit your site's content, we use Sanity. It's like a super-powered Google Doc for your website.

Head to sanity.io and create a free account."

*[Show sign-up]*

"Now we need to create a project. Click 'Create new project' and give it a name — like 'My Company Website'."

*[Create project]*

"Sanity will give you a Project ID. Copy this — we need it in a second."

*[Copy project ID]*

"Now go back to Vercel, click 'Settings', then 'Environment Variables'. 

Paste your Sanity Project ID here."

*[Show adding env var]*

"Click 'Redeploy' and wait 30 seconds..."

*[Show redeploy]*

"Now your site is connected to your content!"

---

**[3:00 - 4:30] Step 3: Edit Your Content**

*[Screen: Sanity Studio]*

"To edit your content, go to sanity.io/manage and open your project. Click 'Studio'."

*[Show studio interface]*

"This is where the magic happens. See all your content sections on the left? Let's edit the homepage.

Click 'Home', then change this headline..."

*[Type new headline]*

"And watch — when I click 'Publish', it goes live instantly."

*[Show change on live site]*

"You can edit everything here — text, images, buttons, everything. No code needed."

---

**[4:30 - 5:30] Step 4: Connect Your Domain**

*[Screen: Vercel dashboard]*

"Last step: let's put this on your own domain.

In Vercel, go to 'Settings' → 'Domains'. Type in your domain..."

*[Type domain]*

"Vercel will show you DNS records to add. Log into wherever you bought your domain — GoDaddy, Namecheap, Cloudflare — and add these records."

*[Show example DNS settings]*

"Once that propagates — usually 5-30 minutes — your site will be live on your domain!"

---

**[5:30 - 6:00] Wrap Up**

*[Screen: Finished site]*

"That's it! You now have:
- A live website on your domain
- A content editor where you can change anything
- Zero monthly fees

If you get stuck, check the written guide in your download, or just reply to your purchase email.

Happy launching!"

*[End screen with logo]*

---

## Video 2: Sanity Studio Deep Dive (3-4 minutes)

### Script

**[0:00 - 0:20] Intro**

"Let me show you how to edit every part of your website using Sanity Studio."

---

**[0:20 - 1:30] Editing Text Content**

*[Screen: Sanity Studio with homepage content]*

"Click any section to edit it. See this headline? Just click, type, done.

The text formatting works like Google Docs. Bold, italic, links — all here.

When you're done, hit 'Publish'. Changes go live in seconds."

---

**[1:30 - 2:30] Editing Images**

*[Screen: Image field in Sanity]*

"For images, click the image field and drag in a new image — or click to browse.

Sanity automatically optimizes your images for fast loading. No need to resize them yourself.

You can also crop and set the focal point right here."

---

**[2:30 - 3:30] Adding New Items**

*[Screen: Repeating content like testimonials]*

"Some sections have multiple items — like testimonials or features.

To add a new one, click the plus button. Fill in the fields. Drag to reorder.

To remove one, click the three dots and delete."

---

**[3:30 - 4:00] Draft vs Published**

"See this toggle? 'Draft' means only you can see the changes. 'Published' means it's live.

This is great when you want to preview changes before they go live.

Make your edits, check the preview, then publish when ready."

---

## Video 3: Custom Domain Setup (2-3 minutes)

### Script

**[0:00 - 0:30] Intro**

"Let's connect your own domain to your new website. This works with any domain registrar — GoDaddy, Namecheap, Cloudflare, Google Domains, whatever you use."

---

**[0:30 - 1:30] Get DNS Records from Vercel**

*[Screen: Vercel domain settings]*

"In Vercel, go to your project → Settings → Domains.

Type your domain name and click Add.

Vercel shows you the DNS records you need. You'll see an A record and maybe a CNAME."

*[Highlight the records]*

"Copy these values — we'll paste them in your registrar."

---

**[1:30 - 2:30] Add Records in Your Registrar**

*[Screen: Example DNS settings page]*

"Log into your domain registrar. Find 'DNS Settings' or 'Manage DNS'.

Add a new record:
- Type: A
- Host: @ (or leave blank)
- Value: [the IP from Vercel]

If you have a CNAME:
- Type: CNAME
- Host: www
- Value: cname.vercel-dns.com

Save your changes."

---

**[2:30 - 3:00] Wait & Verify**

"DNS changes can take 5 minutes to 24 hours to propagate. Usually it's under 30 minutes.

When it's ready, Vercel will show a green checkmark.

And that's it — your site is now on your domain!"

---

## Screen Recording Checklist

### Equipment Needed
- Screen recording software (Loom, OBS, or QuickTime)
- Clean desktop (hide personal bookmarks/files)
- Microphone (built-in is fine, but external is better)

### Before Recording
- [ ] Close unnecessary apps/tabs
- [ ] Turn on Do Not Disturb
- [ ] Have all accounts logged in (Vercel, Sanity, domain registrar demo)
- [ ] Test audio levels
- [ ] Have script visible on second monitor/printout

### During Recording
- [ ] Speak slowly and clearly
- [ ] Pause after each major step
- [ ] Zoom in on important UI elements
- [ ] Say out loud what you're clicking
- [ ] Leave room for editing (pauses are okay)

### After Recording
- [ ] Trim dead air and mistakes
- [ ] Add chapter markers
- [ ] Add captions/subtitles (accessibility + SEO)
- [ ] Export at 1080p minimum
- [ ] Upload to YouTube (unlisted) and embed

---

## Video Hosting Options

| Platform | Pros | Cons |
|----------|------|------|
| **YouTube (Unlisted)** | Free, reliable, embed anywhere | No download control |
| **Loom** | Easy recording + hosting | Free tier limited |
| **Vimeo** | Clean player, download control | Paid for pro features |
| **Self-hosted** | Full control | More work |

**Recommendation:** YouTube unlisted for free + reliable, embed on your site and in the README.
