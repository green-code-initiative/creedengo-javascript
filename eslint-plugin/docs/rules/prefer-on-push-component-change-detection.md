# @creedengo/prefer-on-push-component-change-detection

📝 Ensures Angular component's changeDetection is set to OnPush.

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Why is this an issue?

Angular's default change detection strategy checks all component properties on every possible event, which can be resource-intensive and lead to unnecessary CPU usage and increased energy consumption.

Using `ChangeDetectionStrategy.OnPush` tells Angular to only check a component when:

- Its input properties change
- An event occurs within the component
- Async operations complete (if using `async` pipe)

This optimization reduces unnecessary computations, decreases CPU load, and thus reduces energy consumption on user devices and in data centers.

## Examples

### Non-compliant

```typescript
// No changeDetection property specified
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  @Input() user: User;
  @Output() userUpdated = new EventEmitter<User>();
}
```

### Compliant

```typescript
// changeDetection explicitly set to OnPush
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input() user: User;
  @Output() userUpdated = new EventEmitter<User>();
}
```

This rule is built for [Angular](https://angular.io/) applications.

## Resources

### Documentation

- [Angular Change Detection Strategy](https://angular.io/api/core/ChangeDetectionStrategy) - Official Angular documentation
- [Angular Performance Best Practices](https://angular.io/guide/performance-best-practices) - Performance optimization guide
- [OnPush Change Detection](https://angular.io/guide/change-detection#configuring-component-change-detection-strategies) - Change detection strategies in Angular
