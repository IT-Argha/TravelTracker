# Travel Expense Tracker Website - README

## Overview

This project is a **responsive and visually appealing website** designed as a **Travel Expense Tracker**. Built entirely with **HTML, CSS, and JavaScript**, the website allows users to manage and report travel-related data. It stores data locally in a CSV file, with functionality for importing and exporting records.

---

## Features

### 1. **Form for Data Entry**
- **Fields:**
  - **Date:** Input field for travel date (Format: `DD-MMM-YYYY`).
  - **To (Destination):** Input field for the destination.
  - **From (Source):** Input field for the source location.
  - **Transportation Mode:** Dropdown with the following options:
    - BIKE
    - TAXI
    - AUTO
    - CAB - BILL REQUIRED
    - BUS - TICKET/PASS REQUIRED
    - TRAIN - TICKET / PASS REQUIRED
    - PUBLIC TRANSPORT (OTHERS)
  - **Amount:** Input field for the cost of travel.
  - **From Location (with Pincode):** Input field for the starting location including pincode.
  - **To Location (with Pincode):** Input field for the destination location including pincode.
  - **Kms Travelled:** Input field for the distance traveled.
  - **Note (Optional):** Additional notes field.
- **Submit Button:**
  - Saves the entered data into a CSV file.

---

### 2. **Report Viewer**
- Displays all submitted records in a **table format** below the form.
- Styled with CSS to create unique themes for each transportation mode:
  - **BIKE:** Green theme
  - **TAXI:** Yellow theme
  - **AUTO:** Blue theme
  - **CAB - BILL REQUIRED:** Red theme
  - **BUS - TICKET/PASS REQUIRED:** Purple theme
  - **TRAIN - TICKET / PASS REQUIRED:** Orange theme
  - **PUBLIC TRANSPORT (OTHERS):** Gray theme

---

### 3. **Import and Export**
- **Import Button:** 
  - Uploads an existing CSV file to populate the table.
- **Export Button:**
  - Downloads all current records into a CSV file.

---

### 4. **User Interface**
- **Responsive Design:** Built using CSS Grid and Flexbox for compatibility across devices.
- **Modern Style:** Clean layout with intuitive navigation.
- **Enhanced Usability:**
  - Tooltips and placeholders in form fields.
  - Validation for required fields and correct formats:
    - Date (`DD-MMM-YYYY`).
    - Numerical values for Kms Travelled.

---

## Installation and Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/travel-expense-tracker.git
   ```
2. Open the folder and locate `index.html`.
3. Launch the website by opening `index.html` in your preferred browser.

---

## How to Use

1. Fill out the form with your travel details.
2. Click **Submit** to save the record.
3. View the record in the table below the form.
4. Use **Import** to upload existing CSV data.
5. Use **Export** to download all current data.

---

## Future Enhancements
- Add support for cloud-based storage.
- Incorporate charts and graphs for visualizing expenses.
- Include advanced filters and sorting in the report viewer.

---

Feel free to contribute to this project or report issues. Happy tracking!
