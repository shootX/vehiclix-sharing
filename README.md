# Vehiclix Sharing

მანქანების გაზიარების პლატფორმა, რომელიც საშუალებას გაწვდებს მომხმარებლებს გაზიარონ და დაიქირაონ მანქანები.

## ტექნოლოგიები

- Backend: ASP.NET Core 8.0
- Frontend: React + TypeScript + Vite
- მონაცემთა ბაზა: PostgreSQL
- კონტეინერიზაცია: Docker
- ავტორიზაცია: JWT
- ლოგირება: Serilog
- მონიტორინგი: Sentry

## მოთხოვნები

- .NET 8.0 SDK
- Node.js 18+
- Docker
- Docker Compose

## დაყენება

1. დააკლონირეთ რეპოზიტორია:
```bash
git clone https://github.com/your-username/vehiclix-sharing.git
cd vehiclix-sharing
```

2. გაშვება Docker-ში:
```bash
docker-compose up -d
```

3. ფრონტენდის დაყენება:
```bash
cd src/Vehiclix.Web
npm install
npm run dev
```

4. ბექენდის გაშვება:
```bash
cd src/Vehiclix.API
dotnet run
```

## განვითარება

### ბექენდი
- API ხელმისაწვდომია `http://localhost:5000` მისამართზე
- Swagger დოკუმენტაცია: `http://localhost:5000/swagger`

### ფრონტენდი
- განვითარების სერვერი: `http://localhost:3000`

## ლიცენზია

MIT
