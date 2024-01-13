Proje Nest.js - Prisma _ Postgres kullanılarak oluşturulmuştur.
-------------------------------------------------------------------------

Talimatlar:

1-)Projeyi github clone url linkinden klonlayın.

2-)Terminalde npm i komutu ile bağımlılıkları yükleyin

3-).env ile bir environment file olusturun

4-)env içine DATABASE_URL değişkeni ile postgres değişkeninizi tanımlayın

5-)Localde Postgres database serveri ayağa kaldırın ve bir tane database oluşturun, oluşturduğunuz database ismini .env içinde DATABASE_URL değişkenindeki database kısmına yazın

6-)DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE (database ismi postgres serverda oluşturduğunuz database ismiyle aynı olmalı) şeklinde olmalı

7-)terminale npx prisma migrate dev --name init yazın ve çalıştırarak migration oluşturup database kaydı oluşturun

8-)Daha sonra projeyi nodemon üzerinden çalıştırmak için terminale npm run start:dev komutunu yazın ve çalıştırın

9-)Postman collections'daki istekler ile http://localhost:3000/ üzerinden requestleri atabilirsiniz (Bazı isteklerde authentication authorization kontrolleri yapılmaktadır, bu da kullanıcıdan gelen accessToken'in postman Headers altında Key:authorization Value:Bearer token ile sağlanmaktadır.)



