from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
# import sqlite3 # Stored in memory for now!

app = FastAPI()

# In-memory store for simplicity
riders = []
orders = []

class Location(BaseModel):
    x: int
    y: int

class Rider(BaseModel):
    id: int
    name: str
    location: Location
    speed: float
    satisfaction: int

class Order(BaseModel):
    id: int
    pickup: Location
    dropoff: Location
    deadline: int
    assignedTo: Optional[int] = None

@app.get("/state")
def get_state():
    return {"riders": riders, "orders": orders}

@app.post("/assign")
def assign_order(order_id: int, rider_id: int):
    # Check that the rider exists
    rider = next((r for r in riders if r["id"] == rider_id), None)
    if not rider:
        raise HTTPException(status_code=404, detail="Rider not found")

    # Find the order
    order = next((o for o in orders if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Check if order already assigned
    if order["assignedTo"] is not None:
        raise HTTPException(status_code=400, detail="Order already assigned")

    # Assign the order
    order["assignedTo"] = rider_id

    return {
        "message": f"Order {order_id} assigned to rider {rider_id}",
        "order": order
    }
