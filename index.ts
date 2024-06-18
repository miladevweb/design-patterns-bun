/**
    The Observer interface declares the update method, used by subjects.
*/
interface Observer {
   update(subject: Subject): void
}
/**
    The Subject interface declares a set of methods for managing subscribers.
*/
interface Subject {
   // Attach an observer to the subject
   attach(observer: Observer): void
   // Detach an observer from the subject
   detach(observer: Observer): void
   // Notify all observers about an event.
   notify(): void
}

/**
    The Subject owns some important state and notifies observers when the state changes.
 */
class ConcreteSubject implements Subject {
   /**
        For the sake of simplicity, the Subject's state, essential for all subscribers, is stored in this variable. But it can be a string, enum, and so on.
    */
   public state!: number
   /**
         List of subscribers. In real life, the list of subscribers can be stored more comprehensively (categorized by event type, etc.).
    */
   private observers: Observer[] = []

   // The subscription management methods.
   attach(observer: Observer): void {
      const isExists = this.observers.includes(observer)
      if (isExists) {
         return console.log('Subject: Observer has been attached already')
      }
      console.log('Subject: Attached an observer')
      this.observers.push(observer)
   }
   detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer)
      if (observerIndex === -1) {
         return console.log('Subject: Nonexistent observer')
      }
      this.observers.splice(observerIndex, 1)
      console.log('Subject: Detached an observer')
   }
   /**
        Trigger an update in each subscriber.
    */
   notify(): void {
      console.log('Subject: Notifiying observers....')
      for (const observer of this.observers) {
         observer.update(this)
      }
   }

   /**
        Usually, the subscription logic is only a fraction of what a Subject can really do. Subjects commonly hold some important business logic, that triggers a notification method whenever something important is about to happen (or after it).
    */
   public someBusinessLogic(): void {
      console.log("\nSubject: I'm doing some important")
      this.state = Math.floor(Math.random() * (10 + 1))

      console.log(`Subject: My state has just changed to: ${this.state}`)
      this.notify()
   }
}

class ConcreteObserverA implements Observer {
   update(subject: Subject): void {
      if (subject instanceof ConcreteSubject && subject.state < 3) {
         console.log('ConcreteObserverA: Reacted to the event')
      }
   }
}
class ConcreteObserverB implements Observer {
   update(subject: Subject): void {
      if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
         console.log('ConcreteObserverB: Reacted to the event')
      }
   }
}

// Client code
const subject = new ConcreteSubject()
const observer1 = new ConcreteObserverA()
subject.attach(observer1)

const observer2 = new ConcreteObserverB()
subject.attach(observer2)

subject.someBusinessLogic()
subject.someBusinessLogic()

subject.detach(observer2)
subject.someBusinessLogic()