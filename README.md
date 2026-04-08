# 🚀 SafeWalk AI  
### Smart Safety-Based Route Planner

SafeWalk AI is a full-stack web application that helps users find the **safest walking route** instead of just the shortest one by leveraging real-world data and graph-based algorithms.

---

## 🌟 Features

- 🟢 Safest Route Calculation using custom safety scoring  
- 🔴 Shortest Route Comparison (distance-based)  
- 🗺️ Interactive map visualization using Leaflet  
- 📍 Place search (convert location → coordinates)  
- ⚡ Real-time route generation via FastAPI backend  
- 📊 Safety factors include:
  - Crime rate
  - Lighting conditions
  - Crowd density  

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Leaflet (Maps)
- Axios (API calls)
- CSS

### Backend
- FastAPI
- NetworkX (graph algorithms)
- OSMnx (OpenStreetMap data)
- Pandas, NumPy

---

## ⚙️ How It Works

1. User enters start & destination  
2. Frontend converts place → coordinates (OpenStreetMap API)  
3. Backend:
   - Builds road network graph  
   - Applies safety scoring  
   - Computes:
     - Safest path (Dijkstra algorithm with safety weights)  
     - Shortest path (distance-based)  
4. Backend sends routes to frontend  
5. Map displays:
   - 🟢 Safest route  
   - 🔴 Shortest route  

---



## 📁 Project Structure

```
SafeWalk/
│
├── frontend/              # React frontend
│   ├── src/
│   └── package.json
│
├── backend/               # FastAPI backend
│   ├── main.py
│   ├── services/
│   └── requirements.txt
│
├── algorithm/             # Safety scoring logic
│   ├── safewalk.py
│   └── dataset.csv
│
└── README.md
```



---

## 🚀 Getting Started

### Clone the repository

git clone https://github.com/your-username/safewalk-ai.git

cd safewalk-ai


---

### Run Backend


cd backend
pip install -r requirements.txt
uvicorn main:app --reload


---

### Run Frontend

cd frontend
npm install
npm run dev

---


## 🤝 Contributors

- Anushka Goyal
- Arshi Arya
- Akshita Rabya
- Diya Hansaria

---


