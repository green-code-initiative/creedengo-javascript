# Prefer API collections with pagination (`@creedengo/prefer-collections-with-pagination`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

Pagination helps in optimizing the performance of API requests, especially when dealing with large datasets.
Instead of retrieving the entire dataset in a single request, pagination allows fetching a smaller subset of data,
reducing the response time and resource usage.

Fetching only the necessary data reduces the amount of data transmitted over the network.
This is particularly important for users on limited bandwidth or mobile devices.
Pagination ensures that only the relevant data is transferred, conserving bandwidth and improving overall network
efficiency.

This rule is built for the [NestJS framework](https://nestjs.com) but can work with a controller `@Controller()` and a
decorated method `@Get()`.

```ts
@Controller()
class Test {
  @Get()
  public find(): Promise<string[]> {
  } // Non-compliant
}
```

```ts
interface Pagination {
  items: string[];
  currentPage: number;
  totalPages: number;
}

@Controller()
class Test {
  @Get()
  public find(): Promise<Pagination> {
  } // Compliant
}
```

## Resources

### Documentation

- [CNUMR best practices](https://github.com/cnumr/best-practices/blob/main/chapters/BP_076_en.md) - Avoid transferring
  large amounts of data for processing tasks
- [nestjs-paginate](https://github.com/ppetzold/nestjs-paginate) - Pagination and filtering helper method using Nest.js
  framework

### Articles & blog posts

- [How to Optimize the API Response Package](https://nordicapis.com/optimizing-the-api-response-package/)
- [Unlocking the Power of API Pagination: Best Practices and Strategies](https://dev.to/pragativerma18/unlocking-the-power-of-api-pagination-best-practices-and-strategies-4b49)
