# Complete CRUD Operations for Competition Resources

## Overview
This guide covers ALL Create, Read, Update, and Delete operations for competitions and their nested resources (exams, questions, prizes, sponsors).

---

## 📋 Table of Contents

1. [Competition CRUD](#competition-crud)
2. [Exam CRUD](#exam-crud)
3. [Question CRUD](#question-crud)
4. [Prize CRUD](#prize-crud)
5. [Sponsor CRUD](#sponsor-crud)

---

## 🏆 Competition CRUD

### Create Competition
```
POST /admin/competitions
```

**Body:**
```json
{
  "title": "Grade 9 Quiz Tournament",
  "description": "5-day tournament",
  "grade": "9",
  "competitionType": "tournament",
  "startDate": "2025-10-15T19:00:00.000Z",
  "endDate": "2025-10-19T21:00:00.000Z",
  "requiresPackage": true,
  "packageDuration": 1,
  "maxParticipants": 1000,
  "totalPrizes": "50000",
  "thumbnail": "https://example.com/image.jpg",
  "status": "upcoming"
}
```

### Get All Competitions
```
GET /admin/competitions?status=active&grade=9&type=tournament
```

### Get Single Competition
```
GET /admin/competitions/:id
```

### Update Competition
```
PUT /admin/competitions/:id
```

**Body:** (Only basic fields - no nested relations)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "totalPrizes": "60000",
  "status": "active"
}
```

### Update Competition Status
```
PATCH /admin/competitions/:id/status
```

**Body:**
```json
{
  "status": "active"
}
```

### Delete Competition
```
DELETE /admin/competitions/:id
```

---

## 📝 Exam CRUD

### Create Exam
```
POST /admin/competitions/:competitionId/exams
```

**Body:**
```json
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
      "explanation": "Addis Ababa is the capital city.",
      "questionImage": null,
      "explanationImage": null
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exam added successfully",
  "exam": {
    "id": "exam-uuid",
    "competitionId": "competition-uuid",
    "title": "Day 1: Foundation & Warm-Up",
    "day": 1,
    "duration": 20,
    "totalQuestions": 20
  }
}
```

### Update Exam
```
PUT /admin/competitions/:competitionId/exams/:examId
```

**Body:**
```json
{
  "title": "Updated Exam Title",
  "description": "Updated description",
  "day": 1,
  "scheduledDateTime": "2025-10-15T20:00:00.000Z",
  "duration": 30,
  "totalQuestions": 25,
  "status": "active"
}
```

**Frontend Code:**
```javascript
async function updateExam(competitionId, examId, updates) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/exams/${examId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  );
  
  return await response.json();
}
```

### Delete Exam
```
DELETE /admin/competitions/:competitionId/exams/:examId
```

**Frontend Code:**
```javascript
async function deleteExam(competitionId, examId) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/exams/${examId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  
  return await response.json();
}
```

---

## ❓ Question CRUD

### Add Questions to Exam
```
POST /admin/competitions/:competitionId/exams/:examId/questions
```

**Body:**
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
      "explanation": "Photosynthesis converts light energy into chemical energy.",
      "questionImage": null,
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
      "explanation": "2x + 5 = 15; 2x = 10; x = 5"
    }
  ]
}
```

### Update Question
```
PUT /admin/competitions/:competitionId/exams/:examId/questions/:questionId
```

**Body:**
```json
{
  "question": "Updated question text?",
  "choiceA": "Updated choice A",
  "choiceB": "Updated choice B",
  "choiceC": "Updated choice C",
  "choiceD": "Updated choice D",
  "correctChoice": "B",
  "explanation": "Updated explanation",
  "questionImage": "https://example.com/new-image.jpg",
  "explanationImage": "https://example.com/new-explanation.jpg"
}
```

**Frontend Code:**
```javascript
async function updateQuestion(competitionId, examId, questionId, updates) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/exams/${examId}/questions/${questionId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  );
  
  return await response.json();
}
```

### Delete Question
```
DELETE /admin/competitions/:competitionId/exams/:examId/questions/:questionId
```

**Frontend Code:**
```javascript
async function deleteQuestion(competitionId, examId, questionId) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/exams/${examId}/questions/${questionId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  
  return await response.json();
}
```

---

## 🏅 Prize CRUD

### Add Prize
```
POST /admin/competitions/:competitionId/prizes
```

**Body:**
```json
{
  "rank": 1,
  "prizeName": "Dell Inspiron Laptop",
  "description": "High-performance laptop for educational purposes",
  "image": "https://example.com/laptop.jpg",
  "value": "25000"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Prize added successfully",
  "prize": {
    "id": "prize-uuid",
    "competitionId": "competition-uuid",
    "rank": 1,
    "prizeName": "Dell Inspiron Laptop",
    "value": "25000",
    "claimStatus": "pending"
  }
}
```

### Update Prize
```
PUT /admin/competitions/:competitionId/prizes/:prizeId
```

**Body:**
```json
{
  "prizeName": "Updated Prize Name",
  "description": "Updated description",
  "image": "https://example.com/new-image.jpg",
  "value": "30000",
  "rank": 1
}
```

**Note:** You CANNOT update `winnerId`, `winnerAssignedAt`, `claimStatus`, or verification fields through this endpoint. Use the dedicated prize assignment/verification endpoints.

**Frontend Code:**
```javascript
async function updatePrize(competitionId, prizeId, updates) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/prizes/${prizeId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  );
  
  return await response.json();
}
```

### Delete Prize
```
DELETE /admin/competitions/:competitionId/prizes/:prizeId
```

**Frontend Code:**
```javascript
async function deletePrize(competitionId, prizeId) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/prizes/${prizeId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  
  return await response.json();
}
```

---

## 🤝 Sponsor CRUD

### Add Sponsor
```
POST /admin/competitions/:competitionId/sponsors
```

**Body:**
```json
{
  "name": "ABC Corporation",
  "logo": "https://example.com/logo.png",
  "website": "https://abc.com",
  "description": "Leading technology company supporting education"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sponsor added successfully",
  "sponsor": {
    "id": "sponsor-uuid",
    "competitionId": "competition-uuid",
    "name": "ABC Corporation",
    "logo": "https://example.com/logo.png",
    "website": "https://abc.com"
  }
}
```

### Update Sponsor
```
PUT /admin/competitions/:competitionId/sponsors/:sponsorId
```

**Body:**
```json
{
  "name": "Updated Sponsor Name",
  "logo": "https://example.com/new-logo.png",
  "website": "https://newsponsor.com",
  "description": "Updated sponsor description"
}
```

**Frontend Code:**
```javascript
async function updateSponsor(competitionId, sponsorId, updates) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/sponsors/${sponsorId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    }
  );
  
  return await response.json();
}
```

### Delete Sponsor
```
DELETE /admin/competitions/:competitionId/sponsors/:sponsorId
```

**Frontend Code:**
```javascript
async function deleteSponsor(competitionId, sponsorId) {
  const response = await fetch(
    `https://your-api.com/admin/competitions/${competitionId}/sponsors/${sponsorId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  
  return await response.json();
}
```

---

## 🔄 Complete Example: Managing Competition Resources

```javascript
class CompetitionManager {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  // Helper method for requests
  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // ===== COMPETITION =====
  async updateCompetition(competitionId, updates) {
    return this.request(`/admin/competitions/${competitionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  // ===== EXAMS =====
  async addExam(competitionId, examData) {
    return this.request(`/admin/competitions/${competitionId}/exams`, {
      method: 'POST',
      body: JSON.stringify(examData)
    });
  }

  async updateExam(competitionId, examId, updates) {
    return this.request(`/admin/competitions/${competitionId}/exams/${examId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteExam(competitionId, examId) {
    return this.request(`/admin/competitions/${competitionId}/exams/${examId}`, {
      method: 'DELETE'
    });
  }

  // ===== QUESTIONS =====
  async addQuestions(competitionId, examId, questions) {
    return this.request(
      `/admin/competitions/${competitionId}/exams/${examId}/questions`,
      {
        method: 'POST',
        body: JSON.stringify({ questions })
      }
    );
  }

  async updateQuestion(competitionId, examId, questionId, updates) {
    return this.request(
      `/admin/competitions/${competitionId}/exams/${examId}/questions/${questionId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updates)
      }
    );
  }

  async deleteQuestion(competitionId, examId, questionId) {
    return this.request(
      `/admin/competitions/${competitionId}/exams/${examId}/questions/${questionId}`,
      {
        method: 'DELETE'
      }
    );
  }

  // ===== PRIZES =====
  async addPrize(competitionId, prizeData) {
    return this.request(`/admin/competitions/${competitionId}/prizes`, {
      method: 'POST',
      body: JSON.stringify(prizeData)
    });
  }

  async updatePrize(competitionId, prizeId, updates) {
    return this.request(`/admin/competitions/${competitionId}/prizes/${prizeId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deletePrize(competitionId, prizeId) {
    return this.request(`/admin/competitions/${competitionId}/prizes/${prizeId}`, {
      method: 'DELETE'
    });
  }

  // ===== SPONSORS =====
  async addSponsor(competitionId, sponsorData) {
    return this.request(`/admin/competitions/${competitionId}/sponsors`, {
      method: 'POST',
      body: JSON.stringify(sponsorData)
    });
  }

  async updateSponsor(competitionId, sponsorId, updates) {
    return this.request(`/admin/competitions/${competitionId}/sponsors/${sponsorId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteSponsor(competitionId, sponsorId) {
    return this.request(`/admin/competitions/${competitionId}/sponsors/${sponsorId}`, {
      method: 'DELETE'
    });
  }
}

// Usage Example
const manager = new CompetitionManager('https://your-api.com', 'your-token');

async function updateCompetitionResources() {
  const competitionId = 'competition-uuid';
  
  try {
    // Update competition details
    await manager.updateCompetition(competitionId, {
      title: 'Updated Title',
      totalPrizes: '75000'
    });
    
    // Update an exam
    await manager.updateExam(competitionId, 'exam-uuid', {
      title: 'Updated Exam Title',
      duration: 30
    });
    
    // Add a new prize
    await manager.addPrize(competitionId, {
      rank: 4,
      prizeName: 'Tablet',
      value: '10000'
    });
    
    // Update a question
    await manager.updateQuestion(competitionId, 'exam-uuid', 'question-uuid', {
      question: 'Updated question text?',
      correctChoice: 'B'
    });
    
    console.log('✅ All resources updated successfully');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}
```

---

## 📊 Quick Reference Table

| Resource | Create | Read | Update | Delete |
|----------|--------|------|--------|--------|
| **Competition** | `POST /admin/competitions` | `GET /admin/competitions/:id` | `PUT /admin/competitions/:id` | `DELETE /admin/competitions/:id` |
| **Exam** | `POST /admin/competitions/:id/exams` | Included in competition | `PUT /admin/competitions/:cId/exams/:eId` | `DELETE /admin/competitions/:cId/exams/:eId` |
| **Question** | `POST /admin/competitions/:cId/exams/:eId/questions` | Included in exam | `PUT /admin/competitions/:cId/exams/:eId/questions/:qId` | `DELETE /admin/competitions/:cId/exams/:eId/questions/:qId` |
| **Prize** | `POST /admin/competitions/:id/prizes` | Included in competition | `PUT /admin/competitions/:cId/prizes/:pId` | `DELETE /admin/competitions/:cId/prizes/:pId` |
| **Sponsor** | `POST /admin/competitions/:id/sponsors` | Included in competition | `PUT /admin/competitions/:cId/sponsors/:sId` | `DELETE /admin/competitions/:cId/sponsors/:sId` |

---

## ⚠️ Important Notes

1. **Competition Update**: Only updates basic fields. Use specific endpoints for nested resources.

2. **Exam Updates**: You can update exam details but NOT the questions. Update questions separately.

3. **Prize Updates**: You can update prize details (name, value, etc.) but NOT winner assignment. Use prize assignment endpoint for that.

4. **Cascading Deletes**: 
   - Deleting a competition deletes ALL exams, questions, prizes, sponsors
   - Deleting an exam deletes ALL its questions
   - Be careful!

5. **Authentication**: ALL endpoints require admin authentication.

6. **ID Parameters**: 
   - `:id` or `:competitionId` = Competition ID
   - `:examId` = Exam ID
   - `:questionId` = Question ID
   - `:prizeId` = Prize ID
   - `:sponsorId` = Sponsor ID

---

**Last Updated:** October 4, 2025
