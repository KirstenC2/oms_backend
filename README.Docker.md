### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:5001.

---

### Common Docker & Prisma Issues and Solutions

#### 1. **Backend Cannot Connect to MySQL**

- **Solution:**  
  Use the MySQL service name (e.g., `oms-mysql`) as the database host in your environment variables, not `localhost`.

#### 2. **Prisma Schema Not Found in Container**

- **Cause:**  
  The `prisma/schema.prisma` file was not copied into the Docker image.
- **Solution:**  
  Ensure your Dockerfile includes:
  ```
  COPY prisma ./prisma
  ```
  and that your `.dockerignore` does **not** exclude the `prisma` directory.

#### 3. **Prisma Migration: "No migration found in prisma/migrations"**

- **Cause:**  
  No migration files were generated.
- **Solution:**  
  Run:
  ```
  npx prisma migrate dev --name init
  ```
  to generate and apply migrations.

#### 4. **Prisma Migration Error: P3014 (Shadow Database Permission)**

- **Cause:**  
  The database user does not have permission to create databases, which Prisma needs for shadow database creation.
- **Solution:**  
  - Use the MySQL root user for migrations:
    ```
    DATABASE_URL="mysql://root:root@oms-mysql:3306/office" npx prisma migrate dev --name init
    ```
  - Or, grant `CREATE DATABASE` privilege to your user:
    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'office_user'@'%';
    FLUSH PRIVILEGES;
    ```

#### 5. **docker compose exec "service is not running"**

- **Cause:**  
  Running `docker compose exec` from the wrong directory or with a mismatched Compose project name.
- **Solution:**  
  Always run `docker compose exec` from the directory containing your `compose.yml`.  
  Alternatively, use `docker exec -it <container_name> <command>`.

#### 6. **MySQL Commands in Container**

- To access MySQL and check user permissions:
  ```
  docker exec -it oms-mysql mysql -u office_user -p
  # Enter password: office_pass
  ```
  Then in the MySQL prompt:
  ```sql
  SHOW GRANTS FOR 'office_user'@'%';
  ```

---

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
```<!-- filepath: /Users/kirstenchoo/Documents/nestjs_fullstack/office_backend/README.Docker.md -->
### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:5001.

---

### Common Docker & Prisma Issues and Solutions

#### 1. **Backend Cannot Connect to MySQL**

- **Solution:**  
  Use the MySQL service name (e.g., `oms-mysql`) as the database host in your environment variables, not `localhost`.

#### 2. **Prisma Schema Not Found in Container**

- **Cause:**  
  The `prisma/schema.prisma` file was not copied into the Docker image.
- **Solution:**  
  Ensure your Dockerfile includes:
  ```
  COPY prisma ./prisma
  ```
  and that your `.dockerignore` does **not** exclude the `prisma` directory.

#### 3. **Prisma Migration: "No migration found in prisma/migrations"**

- **Cause:**  
  No migration files were generated.
- **Solution:**  
  Run:
  ```
  npx prisma migrate dev --name init
  ```
  to generate and apply migrations.

#### 4. **Prisma Migration Error: P3014 (Shadow Database Permission)**

- **Cause:**  
  The database user does not have permission to create databases, which Prisma needs for shadow database creation.
- **Solution:**  
  - Use the MySQL root user for migrations:
    ```
    DATABASE_URL="mysql://root:root@oms-mysql:3306/office" npx prisma migrate dev --name init
    ```
  - Or, grant `CREATE DATABASE` privilege to your user:
    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'office_user'@'%';
    FLUSH PRIVILEGES;
    ```

#### 5. **docker compose exec "service is not running"**

- **Cause:**  
  Running `docker compose exec` from the wrong directory or with a mismatched Compose project name.
- **Solution:**  
  Always run `docker compose exec` from the directory containing your `compose.yml`.  
  Alternatively, use `docker exec -it <container_name> <command>`.

#### 6. **MySQL Commands in Container**

- To access MySQL and check user permissions:
  ```
  docker exec -it oms-mysql mysql -u office_user -p
  # Enter password: office_pass
  ```
  Then in the MySQL prompt:
  ```sql
  SHOW GRANTS FOR 'office_user'@'%';
  ```

---

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and