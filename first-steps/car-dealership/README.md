# NestJs

## Project Structure

`src`

### app.controller.spec.ts

The unit tests for the controller.

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
```

### app.controller.ts

A basic controller with a single route.

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### app.module.ts

The root module of the application.

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### app.service.ts

A basic service with a single method.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### main.ts

The entry file of the application which uses the core function NestFactory to create a Nest application instance.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Creates an application instance using the root AppModule
  const app = await NestFactory.create(AppModule);

  // Starts listening for incoming HTTP requests on the specified port
  // If no PORT is set in the environment, it defaults to 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## A quick change just to see how it works:

### app.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postName(name: string): string {
    return `Hello ${name}!`;
  }
}
```

### app.controller.ts

```ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postName(@Body('name') name: string): string {
    return this.appService.postName(name);
  }
}
```

## eslint.config.mjs

```mjs
// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Disables the restriction against using the 'any' type explicitly.
      // Example: function process(input: any) {} is allowed.
      // Turning this off may reduce type safety but allows flexibility during development.
      '@typescript-eslint/no-explicit-any': 'off',
      // Warns when a Promise is used without proper handling (e.g., missing 'await' or '.then/.catch').
      // Helps prevent unexpected behavior caused by unhandled async operations.
      '@typescript-eslint/no-floating-promises': 'warn',
      // Warns when a value with an unknown or unsafe type (like 'any') is passed to a function expecting a safer type.
      // Useful for catching type mismatches and preserving type integrity across function calls.
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
);
```

I added this ones:

```mjs
    rules: {
      // Warns when the 'any' type is used explicitly — helps enforce stronger typing
      '@typescript-eslint/no-explicit-any': 'warn',

      // Warns when Promises are used without being awaited or properly handled (e.g., with .catch)
      '@typescript-eslint/no-floating-promises': 'warn',

      // Warns when a value of unknown or unsafe type is passed as an argument — improves type safety
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Warns when a function is declared without explicitly specifying a return type
      '@typescript-eslint/explicit-function-return-type': 'warn',

      // Warns when declared variables are not used anywhere in the code
      '@typescript-eslint/no-unused-vars': 'warn',

      // Warns when Promises are used incorrectly, such as in conditional expressions or without proper await
      '@typescript-eslint/no-misused-promises': 'warn',

      // Warns when you don’t use `import type` for importing only types — improves clarity and avoids potential issues in compilation
      '@typescript-eslint/consistent-type-imports': 'warn',

      // Warns when using TypeScript directive comments like `@ts-ignore` or `@ts-expect-error`
      // Helps prevent hiding type errors without good reason
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
```

## Start

### Delete Controllers, Services and let the module like this:.

```ts
import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
```

### Then create a new controller

`nest g mo cars`

| Part              | Meaning                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| `nest`            | Calls the NestJS CLI                                                     |
| `g` or `generate` | Command to generate code (you can use `g` as a shorthand)                |
| `mo` or `module`  | Specifies the type of file to generate (in this case, a module)          |
| `cars`            | Name of the module to create (usually plural if it represents a feature) |

this modifies your module like this:

```ts
import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
```

crea la carpeta cars y luego el cars.module.ts

```ts
import { Module } from '@nestjs/common';

@Module({})
export class CarsModule {}
```

y nos da este mensaje en la terminal

`CREATE src/cars/cars.module.ts (85 bytes)`
`UPDATE src/app.module.ts (215 bytes)`

Ahora creo el controlador

`nest g co cars`

`CREATE src/cars/cars.controller.ts (101 bytes)
CREATE src/cars/cars.controller.spec.ts (496 bytes)
UPDATE src/cars/cars.module.ts (170 bytes)`

`cars.controller.ts`

```ts
import { Controller } from '@nestjs/common';

@Controller('cars')
export class CarsController {}
```

`cars.module.ts`

```ts
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';

@Module({
  controllers: [CarsController],
})
export class CarsModule {}
```

`cars.controller.spec.ts`

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

cambios esto

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return ['Toyota', 'Honda', 'Jeep'];
  }
}
```

Y bam tenemos esta ruta

http://localhost:3000/cars

que nos entrega esto

```json
["Toyota", "Honda", "Jeep"]
```

`nest g s cars --no-spec`

`CREATE src/cars/cars.service.ts (92 bytes)`
`UPDATE src/cars/cars.module.ts (244 bytes)`

```ts
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
```
