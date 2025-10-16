# Admin Competition Frontend Integration Guide

## Table of Contents
1. [Authentication](#authentication)
2. [API Endpoints](#api-endpoints)
3. [Data Models](#data-models)
4. [Common Workflows](#common-workflows)
5. [Request/Response Examples](#request-response-examples)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

---

## Authentication

All admin endpoints require:
- JWT token in Authorization header
- Admin or SubAdmin account type

```javascript
// Headers for all admin requests
const headers = {
  'Authorization': `Bearer ${YOUR_JWT_TOKEN}`,
  'Content-Type': 'application/json'
};
```

---

## API Endpoints

### Base URL
```
https://your-api-domain.com/admin/competitions
```

### 1. Create New Competition

**Endpoint:** `POST /admin/competitions`

**Request Body:**
```json
{
  "title": "Grade 9 Quiz Tournament - October 2025",
  "description": "5-day quiz tournament for Grade 9 students covering all subjects",
  "grade": "9",
  "competitionType": "tournament",
  "startDate": "2025-10-15T19:00:00.000Z",
  "endDate": "2025-10-19T21:00:00.000Z",
  "requiresPackage": true,
  "packageDuration": 1,
  "maxParticipants": 1000,
  "totalPrizes": "50000",
  "thumbnail": "https://example.com/competition-thumbnail.jpg",
  "status": "upcoming",
  "exams": [
    {
      "title": "Day 1: Foundation & Warm-Up",
      "description": "General Science, Math, Social Studies",
      "day": 1,
      "scheduledDateTime": "2025-10-15T19:00:00.000Z",
      "duration": 20,
      "totalQuestions": 20,
      "questions": [
        {
          "question": "What is the capital of Ethiopia?",
          "choiceA": "Addis Ababa",
          "choiceB": "Bahir Dar",
          "choiceC": "Hawassa",
          "choiceD": "Mekelle",
          "correctChoice": "A",
          "explanation": "Addis Ababa is the capital and largest city of Ethiopia.",
          "questionImage": null,
          "explanationImage": null
        }
      ]
    }
  ],
  "prizes": [
    {
      "rank": 1,
      "prizeName": "Dell Inspiron Laptop",
      "description": "High-performance laptop for educational purposes",
      "image": "https://example.com/laptop.jpg",
      "value": "25000"
    },
    {
      "rank": 2,
      "prizeName": "iPad Pro",
      "description": "Latest iPad Pro with Apple Pencil",
      "image": "https://example.com/ipad.jpg",
      "value": "15000"
    }
  ],
  "sponsors": [
    {
      "name": "ABC Corporation",
      "logo": "https://example.com/abc-logo.png",
      "website": "https://abc.com",
      "description": "Leading technology company supporting education"
    }
  ]
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Competition created successfully",
  "competition": {
    "id": "uuid-here",
    "title": "Grade 9 Quiz Tournament - October 2025",
    "grade": "9",
    "status": "upcoming",
    "createdAt": "2025-10-04T10:00:00.000Z"
  }
}
```

**Frontend Implementation:**
```javascript
async function createCompetition(competitionData) {
  try {
    const response = await fetch('https://your-api.com/admin/competitions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(competitionData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create competition');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating competition:', error);
    throw error;
  }
}
```

---

### 2. Update Competition

**Endpoint:** `PUT /admin/competitions/:id`

**Request Body:** (Send only fields you want to update)
```json
{
  "title": "Updated Competition Title",
  "description": "Updated description",
  "status": "active",
  "totalPrizes": "60000"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Competition updated successfully",
  "competition": {
    "id": "uuid-here",
    "title": "Updated Competition Title",
    "status": "active",
    "updatedAt": "2025-10-04T11:00:00.000Z"
  }
}
```

**Frontend Implementation:**
```javascript
async function updateCompetition(competitionId, updates) {
  try {
    const response = await fetch(`https://your-api.com/admin/competitions/${competitionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update competition');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating competition:', error);
    throw error;
  }
}
```

---

### 3. Update Competition Status

**Endpoint:** `PATCH /admin/competitions/:id/status`

**Request Body:**
```json
{
  "status": "active"
}
```

**Valid Statuses:**
- `upcoming` - Competition not yet started
- `active` - Competition is currently running
- `completed` - Competition has ended
- `cancelled` - Competition was cancelled

**Success Response:**
```json
{
  "success": true,
  "message": "Competition status updated to active",
  "competition": {
    "id": "uuid-here",
    "status": "active"
  }
}
```

**Frontend Implementation:**
```javascript
async function updateCompetitionStatus(competitionId, newStatus) {
  try {
    const response = await fetch(`https://your-api.com/admin/competitions/${competitionId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update status');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}
```

---

### 4. Delete Competition

**Endpoint:** `DELETE /admin/competitions/:id`

**Success Response:**
```json
{
  "success": true,
  "message": "Competition deleted successfully"
}
```

**Frontend Implementation:**
```javascript
async function deleteCompetition(competitionId) {
  try {
    const response = await fetch(`https://your-api.com/admin/competitions/${competitionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete competition');
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting competition:', error);
    throw error;
  }
}
```

---

### 5. Add Exam to Competition

**Endpoint:** `POST /admin/competitions/:id/exams`

**Request Body:**
```json
{
  "title": "Day 3: Advanced Challenge",
  "description": "Physics, Chemistry, Biology, Advanced Math",
  "day": 3,
  "scheduledDateTime": "2025-10-17T19:00:00.000Z",
  "duration": 30,
  "totalQuestions": 25,
  "questions": [
    {
      "question": "What is the speed of light?",
      "choiceA": "299,792,458 m/s",
      "choiceB": "300,000,000 m/s",
      "choiceC": "250,000,000 m/s",
      "choiceD": "350,000,000 m/s",
      "correctChoice": "A",
      "explanation": "The speed of light in vacuum is exactly 299,792,458 meters per second.",
      "questionImage": null,
      "explanationImage": null
    }
  ]
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Exam added successfully",
  "exam": {
    "id": "exam-uuid",
    "title": "Day 3: Advanced Challenge",
    "day": 3,
    "totalQuestions": 25
  }
}
```

**Frontend Implementation:**
```javascript
async function addExam(competitionId, examData) {
  try {
    const response = await fetch(`https://your-api.com/admin/competitions/${competitionId}/exams`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(examData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add exam');
    }
    
    return data;
  } catch (error) {
    console.error('Error adding exam:', error);
    throw error;
  }
}
```

---

### 6. Add Questions to Exam

**Endpoint:** `POST /admin/competitions/:competitionId/exams/:examId/questions`

**Request Body:**
```json
{
  "questions": [
    {
      "question": "What is photosynthesis?",
      "choiceA": "Process of converting light to chemical energy",
      "choiceB": "Process of cell division",
      "choiceC": "Process of respiration",
      "choiceD": "Process of digestion",
      "correctChoice": "A",
      "explanation": "Photosynthesis is the process by which plants convert light energy into chemical energy.",
      "questionImage": "https://example.com/photosynthesis-diagram.jpg",
      "explanationImage": null
    },
    {
      "questionIndex": 2,
      "question": "Solve: 2x + 5 = 15",
      "choiceA": "x = 5",
      "choiceB": "x = 10",
      "choiceC": "x = 7.5",
      "choiceD": "x = 15",
      "correctChoice": "A",
      "explanation": "2x + 5 = 15; 2x = 10; x = 5",
      "questionImage": null,
      "explanationImage": null
    }
  ]
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "2 questions added successfully"
}
```

**Frontend Implementation:**
```javascript
async function addQuestions(competitionId, examId, questions) {
  try {
    const response = await fetch(
      `https://your-api.com/admin/competitions/${competitionId}/exams/${examId}/questions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ questions })
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add questions');
    }
    
    return data;
  } catch (error) {
    console.error('Error adding questions:', error);
    throw error;
  }
}
```

---

### 7. Get Competition Registrations

**Endpoint:** `GET /admin/competitions/:id/registrations`

**Success Response:**
```json
{
  "success": true,
  "registrations": [
    {
      "id": "reg-uuid",
      "examId": "A1B2C3",
      "registeredAt": "2025-10-10T08:30:00.000Z",
      "student": {
        "id": "student-uuid",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phoneNumber": "+251912345678",
        "gread": "9",
        "schoolName": "ABC High School",
        "region": "Addis Ababa",
        "city": "Addis Ababa"
      },
      "submissions": [
        {
          "id": "sub-uuid",
          "score": 18,
          "totalQuestions": 20,
          "timeSpent": 1200,
          "submittedAt": "2025-10-15T19:20:00.000Z",
          "exam": {
            "title": "Day 1: Foundation & Warm-Up",
            "day": 1
          }
        }
      ],
      "submissionsCount": 1
    }
  ]
}
```

**Frontend Implementation:**
```javascript
async function getRegistrations(competitionId) {
  try {
    const response = await fetch(
      `https://your-api.com/admin/competitions/${competitionId}/registrations`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch registrations');
    }
    
    return data.registrations;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
}
```

---

### 8. Assign Prizes to Winners

**Endpoint:** `POST /admin/competitions/:id/assign-prizes`

**Description:** Automatically assigns prizes to top students based on final leaderboard

**Success Response:**
```json
{
  "success": true,
  "message": "Prizes assigned to 3 winners",
  "assignments": [
    {
      "prizeId": "prize-uuid-1",
      "prizeName": "Dell Inspiron Laptop",
      "rank": 1,
      "studentId": "student-uuid-1",
      "studentName": "John Doe"
    },
    {
      "prizeId": "prize-uuid-2",
      "prizeName": "iPad Pro",
      "rank": 2,
      "studentId": "student-uuid-2",
      "studentName": "Jane Smith"
    }
  ]
}
```

**Frontend Implementation:**
```javascript
async function assignPrizes(competitionId) {
  try {
    const response = await fetch(
      `https://your-api.com/admin/competitions/${competitionId}/assign-prizes`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to assign prizes');
    }
    
    return data;
  } catch (error) {
    console.error('Error assigning prizes:', error);
    throw error;
  }
}
```

---

### 9. Verify Prize Winner's School ID

**Endpoint:** `POST /admin/competitions/:id/verify-prize-winner`

**Request Body:**
```json
{
  "prizeId": "prize-uuid",
  "studentId": "student-uuid",
  "schoolId": "ABC-2024-0123",
  "verificationNotes": "School ID verified with principal. Grade matches."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "School ID verified successfully",
  "verificationResult": "success",
  "prize": {
    "id": "prize-uuid",
    "prizeName": "Dell Inspiron Laptop",
    "rank": 1,
    "claimStatus": "verified"
  }
}
```

**Failure Response (Grade Mismatch):**
```json
{
  "success": true,
  "message": "Prize cancelled due to school ID verification failure. Prize reassigned to next runner-up if available.",
  "verificationResult": "failed",
  "reason": "Grade mismatch"
}
```

**Frontend Implementation:**
```javascript
async function verifyPrizeWinner(competitionId, verificationData) {
  try {
    const response = await fetch(
      `https://your-api.com/admin/competitions/${competitionId}/verify-prize-winner`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(verificationData)
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify winner');
    }
    
    return data;
  } catch (error) {
    console.error('Error verifying winner:', error);
    throw error;
  }
}
```

---

### 10. Get Prize Verification Status

**Endpoint:** `GET /admin/competitions/:id/prize-verification`

**Success Response:**
```json
{
  "success": true,
  "verificationStatus": [
    {
      "id": "prize-uuid-1",
      "rank": 1,
      "prizeName": "Dell Inspiron Laptop",
      "value": "25000",
      "winnerId": "student-uuid-1",
      "winnerAssignedAt": "2025-10-20T10:00:00.000Z",
      "claimStatus": "verified",
      "schoolIdVerified": true,
      "schoolIdVerifiedAt": "2025-10-21T14:30:00.000Z",
      "verificationNotes": "School ID verified successfully",
      "winnerDetails": {
        "id": "student-uuid-1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phoneNumber": "+251912345678",
        "gread": "9",
        "schoolName": "ABC High School",
        "schoolId": "ABC-2024-0123",
        "schoolIdVerified": true,
        "schoolIdVerifiedAt": "2025-10-21T14:30:00.000Z"
      }
    }
  ]
}
```

**Frontend Implementation:**
```javascript
async function getPrizeVerificationStatus(competitionId) {
  try {
    const response = await fetch(
      `https://your-api.com/admin/competitions/${competitionId}/prize-verification`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch verification status');
    }
    
    return data.verificationStatus;
  } catch (error) {
    console.error('Error fetching verification status:', error);
    throw error;
  }
}
```

---

### 11. Export Competition Data

**Endpoint:** `GET /admin/competitions/:id/export`

**Description:** Get complete competition data including all exams, questions, submissions, answers, and leaderboard

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "competition-uuid",
    "title": "Grade 9 Quiz Tournament",
    "grade": "9",
    "status": "completed",
    "exams": [
      {
        "id": "exam-uuid",
        "title": "Day 1: Foundation & Warm-Up",
        "questions": [...],
        "submissions": [
          {
            "id": "submission-uuid",
            "score": 18,
            "registration": {
              "examId": "A1B2C3",
              "student": {
                "firstName": "John",
                "lastName": "Doe"
              }
            },
            "answers": [...]
          }
        ]
      }
    ],
    "leaderboard": [
      {
        "rank": 1,
        "totalScore": 95,
        "student": {
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    ],
    "prizes": [...]
  }
}
```

**Frontend Implementation:**
```javascript
async function exportCompetitionData(competitionId) {
  try {
    const response = await fetch(
      `https://your-api.com/admin/competitions/${competitionId}/export`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to export data');
    }
    
    // Optionally download as JSON file
    const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `competition-${competitionId}-export.json`;
    a.click();
    
    return data.data;
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
}
```

---

## Data Models

### Competition Object
```typescript
interface Competition {
  id: string;
  title: string;
  description?: string;
  grade: "9" | "10" | "11" | "12";
  competitionType: "tournament" | "one-time";
  status: "upcoming" | "active" | "completed" | "cancelled";
  startDate: string; // ISO 8601 datetime
  endDate: string; // ISO 8601 datetime
  totalPrizes?: string;
  thumbnail?: string;
  requiresPackage: boolean;
  packageDuration: number; // months
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}
```

### Exam Object
```typescript
interface Exam {
  id: string;
  competitionId: string;
  title: string;
  description?: string;
  day: number;
  scheduledDateTime: string; // ISO 8601 datetime
  duration: number; // minutes
  totalQuestions: number;
  status: "locked" | "active" | "completed";
  createdAt: string;
  updatedAt: string;
}
```

### Question Object
```typescript
interface Question {
  id: string;
  examId: string;
  questionIndex: number;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctChoice: "A" | "B" | "C" | "D";
  explanation?: string;
  questionImage?: string;
  explanationImage?: string;
  createdAt: string;
}
```

### Prize Object
```typescript
interface Prize {
  id: string;
  competitionId: string;
  rank: number;
  prizeName: string;
  description?: string;
  image?: string;
  value?: string;
  winnerId?: string;
  winnerAssignedAt?: string;
  claimStatus: "pending" | "claimed" | "verified" | "cancelled";
  schoolIdVerificationRequired: boolean;
  schoolIdVerified: boolean;
  schoolIdVerifiedAt?: string;
  verificationNotes?: string;
  createdAt: string;
}
```

### Sponsor Object
```typescript
interface Sponsor {
  id: string;
  competitionId: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  createdAt: string;
}
```

---

## Common Workflows

### Workflow 1: Creating a Complete Competition

```javascript
async function createCompleteCompetition() {
  try {
    // Step 1: Create competition with exams, prizes, and sponsors
    const competition = await createCompetition({
      title: "Grade 9 Quiz Tournament - October 2025",
      grade: "9",
      competitionType: "tournament",
      startDate: "2025-10-15T19:00:00.000Z",
      endDate: "2025-10-19T21:00:00.000Z",
      requiresPackage: true,
      packageDuration: 1,
      maxParticipants: 1000,
      totalPrizes: "50000",
      thumbnail: "https://example.com/thumb.jpg",
      status: "upcoming",
      exams: [
        {
          title: "Day 1: Foundation",
          day: 1,
          scheduledDateTime: "2025-10-15T19:00:00.000Z",
          duration: 20,
          totalQuestions: 20,
          questions: [/* array of questions */]
        }
      ],
      prizes: [
        { rank: 1, prizeName: "Laptop", value: "25000" },
        { rank: 2, prizeName: "iPad", value: "15000" }
      ],
      sponsors: [
        { name: "ABC Corp", logo: "url", website: "url" }
      ]
    });
    
    console.log('Competition created:', competition);
    return competition;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### Workflow 2: Updating Competition Status

```javascript
async function activateCompetition(competitionId) {
  try {
    // Update status to active when competition starts
    const result = await updateCompetitionStatus(competitionId, 'active');
    console.log('Competition activated:', result);
    
    // Optionally notify all registered students
    // ... notification logic
    
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### Workflow 3: Complete Competition & Award Prizes

```javascript
async function completeCompetition(competitionId) {
  try {
    // Step 1: Update status to completed
    await updateCompetitionStatus(competitionId, 'completed');
    
    // Step 2: Assign prizes to winners
    const prizeAssignments = await assignPrizes(competitionId);
    console.log('Prizes assigned:', prizeAssignments);
    
    // Step 3: Get prize verification status
    const verificationStatus = await getPrizeVerificationStatus(competitionId);
    console.log('Verification status:', verificationStatus);
    
    return {
      status: 'completed',
      prizeAssignments,
      verificationStatus
    };
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### Workflow 4: Verify Prize Winner

```javascript
async function verifyWinner(competitionId, prizeId, studentId, schoolId) {
  try {
    // Verify the winner's school ID
    const result = await verifyPrizeWinner(competitionId, {
      prizeId,
      studentId,
      schoolId,
      verificationNotes: "Verified via school principal confirmation"
    });
    
    if (result.verificationResult === 'success') {
      console.log('Winner verified successfully');
      // Update UI to show verified status
    } else {
      console.log('Verification failed:', result.reason);
      // Prize automatically reassigned to next runner-up
    }
    
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Missing required fields: title, grade, startDate, endDate"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Admin privileges required"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Competition not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Failed to create competition"
}
```

### Error Handling Example

```javascript
async function handleCompetitionOperation(operation) {
  try {
    const result = await operation();
    return { success: true, data: result };
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error. Please check your connection.'
      };
    }
    
    // Handle API errors
    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 400:
          return { success: false, error: 'Invalid data provided' };
        case 401:
          return { success: false, error: 'Please log in again', requiresAuth: true };
        case 403:
          return { success: false, error: 'You do not have permission' };
        case 404:
          return { success: false, error: 'Competition not found' };
        case 500:
          return { success: false, error: 'Server error. Please try again later' };
        default:
          return { success: false, error: error.message };
      }
    }
    
    return { success: false, error: error.message };
  }
}
```

---

## Best Practices

### 1. **Date Handling**
Always use ISO 8601 format for dates:
```javascript
const startDate = new Date('2025-10-15T19:00:00').toISOString();
// Output: "2025-10-15T19:00:00.000Z"
```

### 2. **Form Validation**
Validate data before sending:
```javascript
function validateCompetitionData(data) {
  const errors = [];
  
  if (!data.title || data.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters');
  }
  
  if (!['9', '10', '11', '12'].includes(data.grade)) {
    errors.push('Invalid grade selected');
  }
  
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  
  if (startDate >= endDate) {
    errors.push('End date must be after start date');
  }
  
  if (startDate < new Date()) {
    errors.push('Start date cannot be in the past');
  }
  
  return errors;
}
```

### 3. **Token Management**
```javascript
function getAuthHeaders() {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}
```

### 4. **Loading States**
```javascript
async function fetchWithLoading(operation, setLoading) {
  setLoading(true);
  try {
    const result = await operation();
    return result;
  } finally {
    setLoading(false);
  }
}

// Usage:
await fetchWithLoading(
  () => createCompetition(data),
  (loading) => setIsCreating(loading)
);
```

### 5. **Optimistic UI Updates**
```javascript
async function updateCompetitionWithOptimisticUI(id, updates) {
  // Update UI immediately
  updateLocalCompetition(id, updates);
  
  try {
    // Send request to server
    const result = await updateCompetition(id, updates);
    return result;
  } catch (error) {
    // Revert UI changes on error
    revertLocalCompetition(id);
    throw error;
  }
}
```

### 6. **Bulk Operations**
```javascript
async function createMultipleExams(competitionId, exams) {
  const results = [];
  const errors = [];
  
  for (const exam of exams) {
    try {
      const result = await addExam(competitionId, exam);
      results.push(result);
    } catch (error) {
      errors.push({ exam: exam.title, error: error.message });
    }
  }
  
  return { results, errors };
}
```

---

## Quick Reference

### Competition Statuses
- `upcoming` - Not yet started, accepting registrations
- `active` - Currently running, exams in progress
- `completed` - Finished, prizes awarded
- `cancelled` - Cancelled, no longer active

### Prize Claim Statuses
- `pending` - Prize assigned but not claimed
- `claimed` - Winner notified
- `verified` - School ID verified
- `cancelled` - Prize cancelled (given to next runner-up)

### Required Fields for Competition
- `title` ✓
- `grade` ✓
- `startDate` ✓
- `endDate` ✓

### Optional but Recommended
- `description`
- `thumbnail`
- `prizes` array
- `exams` array
- `sponsors` array

---

## Testing Checklist

- [ ] Create competition with all fields
- [ ] Create competition with minimal fields
- [ ] Update competition details
- [ ] Update competition status
- [ ] Add exam to competition
- [ ] Add questions to exam
- [ ] Delete competition
- [ ] Get registrations list
- [ ] Assign prizes automatically
- [ ] Verify prize winner (success case)
- [ ] Verify prize winner (failure/reassignment case)
- [ ] Get prize verification status
- [ ] Export competition data
- [ ] Handle authentication errors
- [ ] Handle validation errors
- [ ] Handle network errors

---

## Support

For questions or issues:
1. Check error messages for specific guidance
2. Verify JWT token is valid and user has admin privileges
3. Ensure all required fields are provided
4. Check date formats are ISO 8601
5. Verify competition exists before operations

---

**Last Updated:** October 4, 2025
**API Version:** 1.0
