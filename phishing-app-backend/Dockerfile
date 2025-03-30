# שימוש ב-Node.js גירסה חדשה
FROM node:20-alpine

# מיקום העבודה בתוך הקונטיינר
WORKDIR /usr/src/app

# העתקת קבצי התלויות
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר קבצי הפרויקט
COPY . .

# חשיפת הפורט שהשרת ירוץ עליו
EXPOSE 5000

# פקודת ההפעלה של השרת
CMD ["npm", "run", "start"]
