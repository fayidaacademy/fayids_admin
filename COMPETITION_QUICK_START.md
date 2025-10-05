# Competition Management - Quick Start Guide

## 🚀 Quick Start

### Accessing Competition Management
1. Log in to the admin panel
2. Navigate to `/competitions` or use the menu to access "Competitions"

---

## 📋 Common Tasks

### Creating a New Competition

**Step 1: Navigate to Create Page**
- Go to `/competitions`
- Click "Create Competition" button

**Step 2: Fill Basic Information**
- Enter competition title (e.g., "Grade 9 Quiz Tournament - October 2025")
- Select grade (9, 10, 11, or 12)
- Choose competition type:
  - **Tournament:** Multiple days with multiple exams
  - **One-time:** Single event
- Set start and end dates
- Optionally set max participants and prize pool
- Click "Next: Add Exams"

**Step 3: Add Exams**
- Click "Add Exam" button
- For each exam, enter:
  - Title (e.g., "Day 1: Foundation & Warm-Up")
  - Day number
  - Scheduled date/time
  - Duration in minutes
  - Total number of questions
- Click "Next: Add Prizes"

**Step 4: Add Prizes**
- Click "Add Prize" button
- For each prize, enter:
  - Prize name (e.g., "Dell Inspiron Laptop")
  - Prize value in currency
  - Description
  - Image URL (optional)
- Click "Next: Add Sponsors"

**Step 5: Add Sponsors (Optional)**
- Click "Add Sponsor" button
- For each sponsor, enter:
  - Company name
  - Logo URL
  - Website
  - Description
- Click "Create Competition"

✅ **Done!** You'll be redirected to the competition detail page.

---

### Managing Competition Status

**Status Flow:**
```
Upcoming → Active → Completed
     ↓
  Cancelled (from any status)
```

**To Change Status:**
1. Go to competition detail page
2. Find "Status Management" section
3. Click the desired status button
4. Confirm the change

**Status Meanings:**
- **Upcoming:** Competition not yet started, accepting registrations
- **Active:** Competition currently running, exams available
- **Completed:** Competition finished, ready for prize assignment
- **Cancelled:** Competition cancelled, no longer active

---

### Assigning Prizes to Winners

**Prerequisites:**
- Competition status must be "Completed"
- All exams must be finished
- Students must have submitted answers

**Steps:**
1. Go to competition detail page
2. In "Status Management" section, click "Assign Prizes"
3. Confirm the assignment
4. System automatically assigns prizes based on final leaderboard

✅ Prizes are assigned to top-ranked students!

---

### Verifying Prize Winners

**When to Verify:**
- After prizes are assigned
- Before distributing physical prizes
- To ensure students are from the correct grade

**Steps:**
1. Go to `/competitions/prizes`
2. Find prizes with "Needs Verification" status
3. Click "Verify Winner" button
4. Enter the student's school ID
5. Add verification notes (optional)
6. Click "Verify Winner"

**What Happens:**
- ✅ **If verification succeeds:** Prize marked as "Verified"
- ❌ **If verification fails:** Prize cancelled and reassigned to next runner-up

**Verification Checks:**
- School ID matches student record
- Grade matches competition grade
- Student information is correct

---

### Viewing Registrations

**To View All Participants:**
1. Go to competition detail page
2. Click "View All" in the Registrations section
   - Or go directly to `/competitions/[id]/registrations`

**Available Information:**
- Student name, email, phone
- School name, region, city
- Exam ID assigned
- All submissions with scores
- Registration date

**Search Participants:**
- Use search box to filter by name, email, or exam ID
- Results update in real-time

**Export Data:**
- Click "Export CSV" button
- File downloads with all participant data
- Open in Excel or Google Sheets

---

### Exporting Competition Data

**Export All Data (JSON):**
1. Go to competition detail page
2. Click "Export" button
3. JSON file downloads automatically
4. Contains: competition info, exams, questions, submissions, answers, leaderboard

**Export Registrations (CSV):**
1. Go to registrations page
2. Click "Export CSV" button
3. CSV file downloads with all participant data

**Use Cases:**
- Backup competition data
- Analyze results in Excel
- Generate custom reports
- Import into other systems

---

## 📊 Understanding the Dashboard

### Main Dashboard (`/competitions`)

**Stats Cards:**
- **Total Competitions:** All competitions created
- **Active Competitions:** Currently running
- **Total Participants:** Sum across all competitions
- **Total Prizes:** Sum of all prize pools

**Quick Actions:**
- **Create Competition:** Start new competition
- **Active Competitions:** View running competitions
- **Upcoming Competitions:** View scheduled competitions
- **Prize Management:** Manage all prizes

**Competition List:**
- Shows all competitions with thumbnails
- Status badges (colored)
- Quick view and edit buttons

---

### Competition Detail Page

**Sections:**
1. **Header:** Title, status, action buttons
2. **Stats:** Quick metrics (exams, participants, prizes, prize pool)
3. **Status Management:** Change competition status
4. **Competition Details:** Dates, requirements, settings
5. **Exams:** List of all exams with details
6. **Prizes:** Prize list with winner status
7. **Sponsors:** Sponsor logos and info
8. **Registrations:** Recent participants preview

---

### Prize Management Page

**Stats Cards:**
- **Total Prizes:** All prizes across competitions
- **Needs Verification:** Prizes awaiting verification
- **Verified:** Successfully verified prizes
- **Pending:** Prizes not yet assigned

**Prize List:**
- Shows all prizes from completed competitions
- Color-coded status badges
- Verify button for unverified prizes
- Winner information display

---

## 🎨 Status Badge Colors

- 🔵 **Blue (Upcoming):** Competition scheduled but not started
- 🟢 **Green (Active):** Competition currently running
- ⚫ **Gray (Completed):** Competition finished
- 🔴 **Red (Cancelled):** Competition cancelled

**Prize Status Colors:**
- 🟡 **Yellow (Pending):** Prize assigned but not claimed
- 🔵 **Blue (Claimed):** Winner notified
- 🟢 **Green (Verified):** School ID verified
- 🔴 **Red (Cancelled):** Prize cancelled, reassigned

---

## ⚠️ Important Notes

### Before Creating a Competition:
- Prepare all exam questions beforehand
- Decide on prize budget and items
- Confirm sponsor agreements
- Set realistic participant limits

### During Competition:
- Monitor active participants
- Check for technical issues
- Be ready to handle support requests

### After Competition:
1. Change status to "Completed"
2. Assign prizes to winners
3. Verify winners' school IDs
4. Export data for records
5. Contact winners for prize distribution

---

## 🆘 Troubleshooting

### "Failed to create competition"
- Check all required fields are filled
- Ensure end date is after start date
- Verify you have admin permissions
- Check network connection

### "Failed to assign prizes"
- Ensure competition status is "Completed"
- Check if all exams have been finished
- Verify there are submissions from students

### "Verification failed"
- School ID doesn't match student record
- Grade mismatch with competition grade
- Prize will be automatically reassigned

### Can't see competitions
- Check if you're logged in as admin
- Clear browser cache and refresh
- Verify API endpoint is correct

---

## 💡 Best Practices

1. **Competition Titles:** Use descriptive titles with grade and date
   - ✅ "Grade 10 Math Competition - November 2025"
   - ❌ "Quiz 1"

2. **Exam Scheduling:** Space exams at least 24 hours apart for tournaments

3. **Prize Values:** Always specify prize monetary value for transparency

4. **Verification Notes:** Always add notes when verifying winners for audit trail

5. **Regular Exports:** Export data regularly for backup

6. **Status Updates:** Update status promptly when competition phase changes

7. **Communication:** Use registration data to communicate with participants

---

## 📞 Support

For technical issues or questions:
- Check the integration guide: `ADMIN_COMPETITION_FRONTEND_GUIDE.md`
- Review implementation details: `COMPETITION_IMPLEMENTATION_SUMMARY.md`
- Contact system administrator

---

## 🔄 Workflow Summary

```
1. Create Competition
   ↓
2. Set Status to "Upcoming"
   ↓
3. Students Register
   ↓
4. Start Date Arrives → Set Status to "Active"
   ↓
5. Students Take Exams
   ↓
6. End Date Arrives → Set Status to "Completed"
   ↓
7. Assign Prizes to Winners
   ↓
8. Verify Winners' School IDs
   ↓
9. Distribute Physical Prizes
   ↓
10. Export Data for Records
```

---

**Last Updated:** October 4, 2025
**Version:** 1.0
