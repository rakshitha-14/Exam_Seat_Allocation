# Exam Seat Allocation System

## Overview

The **Exam Seat Allocation System** is a web-based application designed to automate the process of assigning examination seats to students.

The system reduces manual work by managing student records, exam rooms, available seats, and seat allocation through a simple and responsive interface. It uses **Data Structures and Algorithms** for organizing and distributing seats efficiently, while **Firebase Firestore** provides real-time data storage.

## Problem Statement

Manual examination seat allocation can be time-consuming and may result in duplicate seat assignments, uneven distribution, and difficulty in maintaining student records.

This project provides a centralized system that automates seat allocation and makes the process faster, organized, and easier to manage.

## Objectives

- Automate examination seat allocation.
- Manage student information efficiently.
- Configure rooms and available seats.
- Allocate unique seats to students.
- Provide quick student seat searching.
- Store and retrieve allocation data securely.
- Reduce manual effort and allocation errors.
- Demonstrate practical application of DSA concepts.

## Key Features

### Dashboard
Provides an overview of the examination setup, including:

- Total Students
- Total Rooms
- Total Seats
- Allocated Seats

### Student Management
- Add student details
- View registered students
- Delete student records
- Prevent duplicate Student IDs

### Room Management
- Configure number of examination rooms
- Set seats available per room
- Calculate total available seats automatically

### Automatic Seat Allocation
The system automatically distributes students among available rooms and seats using an allocation algorithm.

### Seat Search
Students can enter their Student ID to quickly find:

- Student Name
- Department
- Year
- Room Number
- Seat Number

### Allocation Results
Displays the complete examination seating arrangement in an organized table.

## DSA Concepts

The project applies fundamental **Data Structures and Algorithms** concepts:

- **List** – stores student and allocation data
- **Dictionary** – represents student and seat information
- **Sorting** – organizes students before allocation
- **Linear Search** – searches for student allocation
- **Indexing** – determines room and seat positions
- **Algorithmic Allocation** – distributes students systematically

### Seat Allocation Logic

The allocation process follows:

```text
Student Data
     ↓
Sort Students
     ↓
Check Available Seats
     ↓
Calculate Room Number
     ↓
Calculate Seat Number
     ↓
Generate Allocation
     ↓
Store in Firebase
     ↓
Display Results

Live prototype : https://exam-seat-allocation-e80g.onrender.com
