# NestJS

## Module

### What is Module?
- a way to group the related features together
- such as controller, services, providers, ...

```
@Module({
  imports: [],        // <-- Other modules
  controllers: [],    // <-- API handlers
  providers: [],      // <-- Services & logic
  exports: []         // <-- What this module shares with others
})
export class SomeModule {}
```

## Prisma

### What is Prisma?
- modern ORM (Object-Relational Mapper)
- database toolkit for Node.js and TypeScript
- helps to:
  - Define db schema in simple schema language (by schema.prisma)
  - generate type safe client 
    - for quering db from js
  - Handling migrations to update db schema safely and predictably

### Key Concept

#### Prisma Client
- auto-generated
- type-safe query builder
- example
```
const users = await prisma.user.findMany({
  where: { name: { contains: 'Jett' } },
});
```

#### Prisma Migrate
- while the db schema has changes, this is the migration system which is safe and repeatable migration.

#### Prisma Studio
This is the Visual GUI which can directly explore and edit the db content while development

### How it works?
#### Schema-first Approach
define the table (model) in schema.prisma
```
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
}
```
After the model has been determined/ finalized, the migration should be executed to make changes on the database.
```
npx prisma migrate dev --name init
```
This migration will run:
- generate SQL commands which needed to create/update the tables
- Apply those changes to the actual database

#### Type-safe client generation
- example:
```
npx prisma generate
```
Prisma reads your schema and generate a client (@prisma/client) that being imported and applied in code.
- Client provides:
  - auto-complete, type-checking, and IntelliSense 

### Prisma Schema Language (PSL) Details
Example:
```
model Workspace {
  id      String   @id @default(uuid())
  name    String
  users   User[]   @relation("WorkspaceUsers")
}

model User {
  id          String      @id @default(uuid())
  email       String      @unique
  name        String
  workspace   Workspace?  @relation(fields: [workspaceId], references: [id])
  workspaceId String?
}
```

- model: defines tables/entities.
- @id: primary key
- @default: default value for a field
- @unique: unique constraint
- @relation: defines relations between models (one-to-many, many-to-many)
- Scalars: String, Int, Boolean, DateTime, Float, Json

