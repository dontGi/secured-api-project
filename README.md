# Secured API Project

## Overview

This project is a secure Node.js API built with Express that implements advanced security measures including rate limiting, CORS restrictions, security headers, and API key authentication. It also includes a basic brute-force protection mechanism on the login endpoint.

---

## Features

- **Rate Limiting**: Limits repeated requests from the same IP to prevent brute-force and DoS attacks.  
- **CORS Configuration**: Restricts API access to trusted frontend domains only.  
- **Security Headers**: Uses Helmet to set Content Security Policy (CSP) and HTTP Strict Transport Security (HSTS).  
- **API Key Authentication**: Secures API endpoints using an API key sent in headers.  
- **Login Route with Brute-Force Protection**: Tracks failed login attempts per IP and temporarily blocks excessive attempts.  

---

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
