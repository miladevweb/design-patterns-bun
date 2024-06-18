// private some === #some, the only difference is that the # isn't compiled on build / when building
class Singleton {
   static #instance: Singleton
   private constructor() {}

   public static get instance(): Singleton {
      if (!this.#instance) {
         this.#instance = new Singleton()
      }
      return this.#instance
   }
   public someBusinessLogic() {
      console.log('Any logic here!!!')
   }
}

const s1 = Singleton.instance
const s2 = Singleton.instance

if (s1 === s2) {
   console.log('Singleton works, both variables have the same instance')
} else {
   console.log('Singleton failed, variables contain differents instances')
}
