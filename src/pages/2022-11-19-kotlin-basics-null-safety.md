---
layout: blog
hidden: false
path: /kotlin-basics-null-safety
title: "[Kotlin basics] Surviving Null Safety"
tags: Kotlin
date: 2025-12-26T13:58:44.853Z
---
Hey everyone! I’m starting a series on Kotlin basics, and we have to kick things off with one of its most powerful features: **Null Safety**. 

In Kotlin, if you say something is a **String**, it **must** be a non-nullable value. Period. To allow "nothingness," you have to be explicit by using the `?` operator.

I’ve been diving into *[Effective Kotlin](https://leanpub.com/effectivekotlin)* by Marcin Moskala (highly recommend it!) and some great articles from *[TypeAlias](https://typealias.com/start/kotlin-nulls/)*. One thing to keep in mind is that `null` isn't just "nothing"—it’s actually the only instance of the `Nothing?` type, which sits at the very bottom of the Kotlin type hierarchy.

### 1. The Magic Question Mark (`?`)

In Kotlin, types are **non-nullable** by default. To tell the compiler that a variable can hold a null value, you add the question mark:

```kotlin
val name: String? = null // Explicitly nullable
```

### 2. Safe Call (`?.`)

Instead of those old-school `if (obj != null)` checks everywhere, we use the safe call. If the object is null, the expression just returns null instead of throwing an exception.

```
val length = name?.length
```

### 3. Elvis Operator (`?:`)

This is your "Plan B". It allows you to provide a default value whenever an expression results in null.

```
val displayName = name ?: "Guest"
```

### 4. Smart Casting

Kotlin is smart. If you perform a null check (like `if (name != null)`), the compiler automatically casts the variable to a non-nullable type inside that scope.

### 5. The Double Bang (`!!`)

The "trust me, I know what I'm doing" operator. It forces a nullable value into a non-nullable one, but if it's actually null, your app **will** crash. Use it very sparingly.

- - -

### 🚨 The "Real World" Trap: Avro, Kafka, and toString() at iFood

I wanted to wrap up with a practical lesson I've learned during my time at **iFood**. This is a mistake I've seen even senior devs make, and it’s a tricky one because **the IDE won’t warn you.**

* **The Scenario:** We use **Avro** to consume events from **Kafka**. When working with Avro, string values often come as a `CharSequence`. To map these into our internal Kotlin Data Classes, we need to call `.toString()` to get a proper `String`.
* **The Mistake:** You assume that calling `.toString()` on that field is fine because it’s a common conversion.
* **The Trap:** Since `toString()` is available on `Any?`, the compiler won't highlight this as an error. However, calling `.toString()` on a nullable `CharSequence` without a safe call is a recipe for disaster.
* **The Result:** If the Avro record arrives with a null value for that field, calling `date.toString()` will throw a **NullPointerException**.
* **The Critical Impact:** At iFood, we process **millions of events**. A crash like this in a high-volume pipeline can be catastrophic. If the reprocessing flow fails, it can lead to people not receiving their money on time. We're talking about real impact on people's lives and a massive amount of stress for the engineering team trying to recover the data.

**My takeaway:** This is why I always recommend **maximum attention during Code Reviews**. Whenever you're converting types from external events, always use the safe call: `date?.toString()`. It’s a tiny detail that prevents huge production disasters.

- - -

**Bottom line:** Kotlin was built to make nulls explicit. Use that to your advantage and keep an eye out for those sneaky `toString()` conversions during PR reviews!

Have you ever had a NullPointerException sneak into your event consumers? Let's chat in the comments! ✌️

- - -
