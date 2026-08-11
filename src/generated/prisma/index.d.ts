
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Sku
 * 
 */
export type Sku = $Result.DefaultSelection<Prisma.$SkuPayload>
/**
 * Model Process
 * 
 */
export type Process = $Result.DefaultSelection<Prisma.$ProcessPayload>
/**
 * Model SkuProcess
 * 
 */
export type SkuProcess = $Result.DefaultSelection<Prisma.$SkuProcessPayload>
/**
 * Model Rejection
 * 
 */
export type Rejection = $Result.DefaultSelection<Prisma.$RejectionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sku`: Exposes CRUD operations for the **Sku** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skus
    * const skus = await prisma.sku.findMany()
    * ```
    */
  get sku(): Prisma.SkuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.process`: Exposes CRUD operations for the **Process** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Processes
    * const processes = await prisma.process.findMany()
    * ```
    */
  get process(): Prisma.ProcessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skuProcess`: Exposes CRUD operations for the **SkuProcess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkuProcesses
    * const skuProcesses = await prisma.skuProcess.findMany()
    * ```
    */
  get skuProcess(): Prisma.SkuProcessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rejection`: Exposes CRUD operations for the **Rejection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rejections
    * const rejections = await prisma.rejection.findMany()
    * ```
    */
  get rejection(): Prisma.RejectionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Customer: 'Customer',
    Sku: 'Sku',
    Process: 'Process',
    SkuProcess: 'SkuProcess',
    Rejection: 'Rejection'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "customer" | "sku" | "process" | "skuProcess" | "rejection"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Sku: {
        payload: Prisma.$SkuPayload<ExtArgs>
        fields: Prisma.SkuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>
          }
          findFirst: {
            args: Prisma.SkuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>
          }
          findMany: {
            args: Prisma.SkuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>[]
          }
          create: {
            args: Prisma.SkuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>
          }
          createMany: {
            args: Prisma.SkuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>[]
          }
          delete: {
            args: Prisma.SkuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>
          }
          update: {
            args: Prisma.SkuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>
          }
          deleteMany: {
            args: Prisma.SkuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>[]
          }
          upsert: {
            args: Prisma.SkuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuPayload>
          }
          aggregate: {
            args: Prisma.SkuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSku>
          }
          groupBy: {
            args: Prisma.SkuGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkuGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkuCountArgs<ExtArgs>
            result: $Utils.Optional<SkuCountAggregateOutputType> | number
          }
        }
      }
      Process: {
        payload: Prisma.$ProcessPayload<ExtArgs>
        fields: Prisma.ProcessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>
          }
          findFirst: {
            args: Prisma.ProcessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>
          }
          findMany: {
            args: Prisma.ProcessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>[]
          }
          create: {
            args: Prisma.ProcessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>
          }
          createMany: {
            args: Prisma.ProcessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>[]
          }
          delete: {
            args: Prisma.ProcessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>
          }
          update: {
            args: Prisma.ProcessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>
          }
          deleteMany: {
            args: Prisma.ProcessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>[]
          }
          upsert: {
            args: Prisma.ProcessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessPayload>
          }
          aggregate: {
            args: Prisma.ProcessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcess>
          }
          groupBy: {
            args: Prisma.ProcessGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessCountAggregateOutputType> | number
          }
        }
      }
      SkuProcess: {
        payload: Prisma.$SkuProcessPayload<ExtArgs>
        fields: Prisma.SkuProcessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkuProcessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkuProcessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>
          }
          findFirst: {
            args: Prisma.SkuProcessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkuProcessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>
          }
          findMany: {
            args: Prisma.SkuProcessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>[]
          }
          create: {
            args: Prisma.SkuProcessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>
          }
          createMany: {
            args: Prisma.SkuProcessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkuProcessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>[]
          }
          delete: {
            args: Prisma.SkuProcessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>
          }
          update: {
            args: Prisma.SkuProcessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>
          }
          deleteMany: {
            args: Prisma.SkuProcessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkuProcessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkuProcessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>[]
          }
          upsert: {
            args: Prisma.SkuProcessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkuProcessPayload>
          }
          aggregate: {
            args: Prisma.SkuProcessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkuProcess>
          }
          groupBy: {
            args: Prisma.SkuProcessGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkuProcessGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkuProcessCountArgs<ExtArgs>
            result: $Utils.Optional<SkuProcessCountAggregateOutputType> | number
          }
        }
      }
      Rejection: {
        payload: Prisma.$RejectionPayload<ExtArgs>
        fields: Prisma.RejectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RejectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RejectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>
          }
          findFirst: {
            args: Prisma.RejectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RejectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>
          }
          findMany: {
            args: Prisma.RejectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>[]
          }
          create: {
            args: Prisma.RejectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>
          }
          createMany: {
            args: Prisma.RejectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RejectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>[]
          }
          delete: {
            args: Prisma.RejectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>
          }
          update: {
            args: Prisma.RejectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>
          }
          deleteMany: {
            args: Prisma.RejectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RejectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RejectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>[]
          }
          upsert: {
            args: Prisma.RejectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RejectionPayload>
          }
          aggregate: {
            args: Prisma.RejectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRejection>
          }
          groupBy: {
            args: Prisma.RejectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RejectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RejectionCountArgs<ExtArgs>
            result: $Utils.Optional<RejectionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    customer?: CustomerOmit
    sku?: SkuOmit
    process?: ProcessOmit
    skuProcess?: SkuProcessOmit
    rejection?: RejectionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    skus: number
    rejections: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skus?: boolean | CustomerCountOutputTypeCountSkusArgs
    rejections?: boolean | CustomerCountOutputTypeCountRejectionsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountSkusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkuWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountRejectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RejectionWhereInput
  }


  /**
   * Count Type SkuCountOutputType
   */

  export type SkuCountOutputType = {
    processes: number
    rejections: number
  }

  export type SkuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processes?: boolean | SkuCountOutputTypeCountProcessesArgs
    rejections?: boolean | SkuCountOutputTypeCountRejectionsArgs
  }

  // Custom InputTypes
  /**
   * SkuCountOutputType without action
   */
  export type SkuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuCountOutputType
     */
    select?: SkuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkuCountOutputType without action
   */
  export type SkuCountOutputTypeCountProcessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkuProcessWhereInput
  }

  /**
   * SkuCountOutputType without action
   */
  export type SkuCountOutputTypeCountRejectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RejectionWhereInput
  }


  /**
   * Count Type ProcessCountOutputType
   */

  export type ProcessCountOutputType = {
    skuProcesses: number
  }

  export type ProcessCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skuProcesses?: boolean | ProcessCountOutputTypeCountSkuProcessesArgs
  }

  // Custom InputTypes
  /**
   * ProcessCountOutputType without action
   */
  export type ProcessCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessCountOutputType
     */
    select?: ProcessCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProcessCountOutputType without action
   */
  export type ProcessCountOutputTypeCountSkuProcessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkuProcessWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    name: string | null
    notes: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    name: string | null
    notes: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    customerId: number
    name: number
    notes: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    notes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    notes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    customerId?: true
    name?: true
    notes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    customerId: string
    name: string
    notes: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    notes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    skus?: boolean | Customer$skusArgs<ExtArgs>
    rejections?: boolean | Customer$rejectionsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    notes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    name?: boolean
    notes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    customerId?: boolean
    name?: boolean
    notes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "name" | "notes" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skus?: boolean | Customer$skusArgs<ExtArgs>
    rejections?: boolean | Customer$rejectionsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      skus: Prisma.$SkuPayload<ExtArgs>[]
      rejections: Prisma.$RejectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      name: string
      notes: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    skus<T extends Customer$skusArgs<ExtArgs> = {}>(args?: Subset<T, Customer$skusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rejections<T extends Customer$rejectionsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$rejectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly customerId: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly notes: FieldRef<"Customer", 'String'>
    readonly isActive: FieldRef<"Customer", 'Boolean'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.skus
   */
  export type Customer$skusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    where?: SkuWhereInput
    orderBy?: SkuOrderByWithRelationInput | SkuOrderByWithRelationInput[]
    cursor?: SkuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkuScalarFieldEnum | SkuScalarFieldEnum[]
  }

  /**
   * Customer.rejections
   */
  export type Customer$rejectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    where?: RejectionWhereInput
    orderBy?: RejectionOrderByWithRelationInput | RejectionOrderByWithRelationInput[]
    cursor?: RejectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RejectionScalarFieldEnum | RejectionScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Sku
   */

  export type AggregateSku = {
    _count: SkuCountAggregateOutputType | null
    _min: SkuMinAggregateOutputType | null
    _max: SkuMaxAggregateOutputType | null
  }

  export type SkuMinAggregateOutputType = {
    id: string | null
    skuCode: string | null
    name: string | null
    category: string | null
    description: string | null
    customerId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkuMaxAggregateOutputType = {
    id: string | null
    skuCode: string | null
    name: string | null
    category: string | null
    description: string | null
    customerId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkuCountAggregateOutputType = {
    id: number
    skuCode: number
    name: number
    category: number
    description: number
    customerId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SkuMinAggregateInputType = {
    id?: true
    skuCode?: true
    name?: true
    category?: true
    description?: true
    customerId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkuMaxAggregateInputType = {
    id?: true
    skuCode?: true
    name?: true
    category?: true
    description?: true
    customerId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkuCountAggregateInputType = {
    id?: true
    skuCode?: true
    name?: true
    category?: true
    description?: true
    customerId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SkuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sku to aggregate.
     */
    where?: SkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skus to fetch.
     */
    orderBy?: SkuOrderByWithRelationInput | SkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skus
    **/
    _count?: true | SkuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkuMaxAggregateInputType
  }

  export type GetSkuAggregateType<T extends SkuAggregateArgs> = {
        [P in keyof T & keyof AggregateSku]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSku[P]>
      : GetScalarType<T[P], AggregateSku[P]>
  }




  export type SkuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkuWhereInput
    orderBy?: SkuOrderByWithAggregationInput | SkuOrderByWithAggregationInput[]
    by: SkuScalarFieldEnum[] | SkuScalarFieldEnum
    having?: SkuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkuCountAggregateInputType | true
    _min?: SkuMinAggregateInputType
    _max?: SkuMaxAggregateInputType
  }

  export type SkuGroupByOutputType = {
    id: string
    skuCode: string
    name: string
    category: string | null
    description: string | null
    customerId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SkuCountAggregateOutputType | null
    _min: SkuMinAggregateOutputType | null
    _max: SkuMaxAggregateOutputType | null
  }

  type GetSkuGroupByPayload<T extends SkuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkuGroupByOutputType[P]>
            : GetScalarType<T[P], SkuGroupByOutputType[P]>
        }
      >
    >


  export type SkuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuCode?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    customerId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    processes?: boolean | Sku$processesArgs<ExtArgs>
    rejections?: boolean | Sku$rejectionsArgs<ExtArgs>
    _count?: boolean | SkuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sku"]>

  export type SkuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuCode?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    customerId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sku"]>

  export type SkuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuCode?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    customerId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sku"]>

  export type SkuSelectScalar = {
    id?: boolean
    skuCode?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    customerId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SkuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "skuCode" | "name" | "category" | "description" | "customerId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["sku"]>
  export type SkuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    processes?: boolean | Sku$processesArgs<ExtArgs>
    rejections?: boolean | Sku$rejectionsArgs<ExtArgs>
    _count?: boolean | SkuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SkuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type SkuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $SkuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sku"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      processes: Prisma.$SkuProcessPayload<ExtArgs>[]
      rejections: Prisma.$RejectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      skuCode: string
      name: string
      category: string | null
      description: string | null
      customerId: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sku"]>
    composites: {}
  }

  type SkuGetPayload<S extends boolean | null | undefined | SkuDefaultArgs> = $Result.GetResult<Prisma.$SkuPayload, S>

  type SkuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkuCountAggregateInputType | true
    }

  export interface SkuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sku'], meta: { name: 'Sku' } }
    /**
     * Find zero or one Sku that matches the filter.
     * @param {SkuFindUniqueArgs} args - Arguments to find a Sku
     * @example
     * // Get one Sku
     * const sku = await prisma.sku.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkuFindUniqueArgs>(args: SelectSubset<T, SkuFindUniqueArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sku that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkuFindUniqueOrThrowArgs} args - Arguments to find a Sku
     * @example
     * // Get one Sku
     * const sku = await prisma.sku.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkuFindUniqueOrThrowArgs>(args: SelectSubset<T, SkuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sku that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuFindFirstArgs} args - Arguments to find a Sku
     * @example
     * // Get one Sku
     * const sku = await prisma.sku.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkuFindFirstArgs>(args?: SelectSubset<T, SkuFindFirstArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sku that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuFindFirstOrThrowArgs} args - Arguments to find a Sku
     * @example
     * // Get one Sku
     * const sku = await prisma.sku.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkuFindFirstOrThrowArgs>(args?: SelectSubset<T, SkuFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Skus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skus
     * const skus = await prisma.sku.findMany()
     * 
     * // Get first 10 Skus
     * const skus = await prisma.sku.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skuWithIdOnly = await prisma.sku.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkuFindManyArgs>(args?: SelectSubset<T, SkuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sku.
     * @param {SkuCreateArgs} args - Arguments to create a Sku.
     * @example
     * // Create one Sku
     * const Sku = await prisma.sku.create({
     *   data: {
     *     // ... data to create a Sku
     *   }
     * })
     * 
     */
    create<T extends SkuCreateArgs>(args: SelectSubset<T, SkuCreateArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Skus.
     * @param {SkuCreateManyArgs} args - Arguments to create many Skus.
     * @example
     * // Create many Skus
     * const sku = await prisma.sku.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkuCreateManyArgs>(args?: SelectSubset<T, SkuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Skus and returns the data saved in the database.
     * @param {SkuCreateManyAndReturnArgs} args - Arguments to create many Skus.
     * @example
     * // Create many Skus
     * const sku = await prisma.sku.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Skus and only return the `id`
     * const skuWithIdOnly = await prisma.sku.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkuCreateManyAndReturnArgs>(args?: SelectSubset<T, SkuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sku.
     * @param {SkuDeleteArgs} args - Arguments to delete one Sku.
     * @example
     * // Delete one Sku
     * const Sku = await prisma.sku.delete({
     *   where: {
     *     // ... filter to delete one Sku
     *   }
     * })
     * 
     */
    delete<T extends SkuDeleteArgs>(args: SelectSubset<T, SkuDeleteArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sku.
     * @param {SkuUpdateArgs} args - Arguments to update one Sku.
     * @example
     * // Update one Sku
     * const sku = await prisma.sku.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkuUpdateArgs>(args: SelectSubset<T, SkuUpdateArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Skus.
     * @param {SkuDeleteManyArgs} args - Arguments to filter Skus to delete.
     * @example
     * // Delete a few Skus
     * const { count } = await prisma.sku.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkuDeleteManyArgs>(args?: SelectSubset<T, SkuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skus
     * const sku = await prisma.sku.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkuUpdateManyArgs>(args: SelectSubset<T, SkuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skus and returns the data updated in the database.
     * @param {SkuUpdateManyAndReturnArgs} args - Arguments to update many Skus.
     * @example
     * // Update many Skus
     * const sku = await prisma.sku.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Skus and only return the `id`
     * const skuWithIdOnly = await prisma.sku.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SkuUpdateManyAndReturnArgs>(args: SelectSubset<T, SkuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sku.
     * @param {SkuUpsertArgs} args - Arguments to update or create a Sku.
     * @example
     * // Update or create a Sku
     * const sku = await prisma.sku.upsert({
     *   create: {
     *     // ... data to create a Sku
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sku we want to update
     *   }
     * })
     */
    upsert<T extends SkuUpsertArgs>(args: SelectSubset<T, SkuUpsertArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Skus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuCountArgs} args - Arguments to filter Skus to count.
     * @example
     * // Count the number of Skus
     * const count = await prisma.sku.count({
     *   where: {
     *     // ... the filter for the Skus we want to count
     *   }
     * })
    **/
    count<T extends SkuCountArgs>(
      args?: Subset<T, SkuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sku.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkuAggregateArgs>(args: Subset<T, SkuAggregateArgs>): Prisma.PrismaPromise<GetSkuAggregateType<T>>

    /**
     * Group by Sku.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkuGroupByArgs['orderBy'] }
        : { orderBy?: SkuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sku model
   */
  readonly fields: SkuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sku.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    processes<T extends Sku$processesArgs<ExtArgs> = {}>(args?: Subset<T, Sku$processesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rejections<T extends Sku$rejectionsArgs<ExtArgs> = {}>(args?: Subset<T, Sku$rejectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sku model
   */
  interface SkuFieldRefs {
    readonly id: FieldRef<"Sku", 'String'>
    readonly skuCode: FieldRef<"Sku", 'String'>
    readonly name: FieldRef<"Sku", 'String'>
    readonly category: FieldRef<"Sku", 'String'>
    readonly description: FieldRef<"Sku", 'String'>
    readonly customerId: FieldRef<"Sku", 'String'>
    readonly isActive: FieldRef<"Sku", 'Boolean'>
    readonly createdAt: FieldRef<"Sku", 'DateTime'>
    readonly updatedAt: FieldRef<"Sku", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sku findUnique
   */
  export type SkuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * Filter, which Sku to fetch.
     */
    where: SkuWhereUniqueInput
  }

  /**
   * Sku findUniqueOrThrow
   */
  export type SkuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * Filter, which Sku to fetch.
     */
    where: SkuWhereUniqueInput
  }

  /**
   * Sku findFirst
   */
  export type SkuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * Filter, which Sku to fetch.
     */
    where?: SkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skus to fetch.
     */
    orderBy?: SkuOrderByWithRelationInput | SkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skus.
     */
    cursor?: SkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skus.
     */
    distinct?: SkuScalarFieldEnum | SkuScalarFieldEnum[]
  }

  /**
   * Sku findFirstOrThrow
   */
  export type SkuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * Filter, which Sku to fetch.
     */
    where?: SkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skus to fetch.
     */
    orderBy?: SkuOrderByWithRelationInput | SkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skus.
     */
    cursor?: SkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skus.
     */
    distinct?: SkuScalarFieldEnum | SkuScalarFieldEnum[]
  }

  /**
   * Sku findMany
   */
  export type SkuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * Filter, which Skus to fetch.
     */
    where?: SkuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skus to fetch.
     */
    orderBy?: SkuOrderByWithRelationInput | SkuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skus.
     */
    cursor?: SkuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skus.
     */
    distinct?: SkuScalarFieldEnum | SkuScalarFieldEnum[]
  }

  /**
   * Sku create
   */
  export type SkuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * The data needed to create a Sku.
     */
    data: XOR<SkuCreateInput, SkuUncheckedCreateInput>
  }

  /**
   * Sku createMany
   */
  export type SkuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skus.
     */
    data: SkuCreateManyInput | SkuCreateManyInput[]
  }

  /**
   * Sku createManyAndReturn
   */
  export type SkuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * The data used to create many Skus.
     */
    data: SkuCreateManyInput | SkuCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sku update
   */
  export type SkuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * The data needed to update a Sku.
     */
    data: XOR<SkuUpdateInput, SkuUncheckedUpdateInput>
    /**
     * Choose, which Sku to update.
     */
    where: SkuWhereUniqueInput
  }

  /**
   * Sku updateMany
   */
  export type SkuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skus.
     */
    data: XOR<SkuUpdateManyMutationInput, SkuUncheckedUpdateManyInput>
    /**
     * Filter which Skus to update
     */
    where?: SkuWhereInput
    /**
     * Limit how many Skus to update.
     */
    limit?: number
  }

  /**
   * Sku updateManyAndReturn
   */
  export type SkuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * The data used to update Skus.
     */
    data: XOR<SkuUpdateManyMutationInput, SkuUncheckedUpdateManyInput>
    /**
     * Filter which Skus to update
     */
    where?: SkuWhereInput
    /**
     * Limit how many Skus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sku upsert
   */
  export type SkuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * The filter to search for the Sku to update in case it exists.
     */
    where: SkuWhereUniqueInput
    /**
     * In case the Sku found by the `where` argument doesn't exist, create a new Sku with this data.
     */
    create: XOR<SkuCreateInput, SkuUncheckedCreateInput>
    /**
     * In case the Sku was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkuUpdateInput, SkuUncheckedUpdateInput>
  }

  /**
   * Sku delete
   */
  export type SkuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    /**
     * Filter which Sku to delete.
     */
    where: SkuWhereUniqueInput
  }

  /**
   * Sku deleteMany
   */
  export type SkuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skus to delete
     */
    where?: SkuWhereInput
    /**
     * Limit how many Skus to delete.
     */
    limit?: number
  }

  /**
   * Sku.processes
   */
  export type Sku$processesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    where?: SkuProcessWhereInput
    orderBy?: SkuProcessOrderByWithRelationInput | SkuProcessOrderByWithRelationInput[]
    cursor?: SkuProcessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkuProcessScalarFieldEnum | SkuProcessScalarFieldEnum[]
  }

  /**
   * Sku.rejections
   */
  export type Sku$rejectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    where?: RejectionWhereInput
    orderBy?: RejectionOrderByWithRelationInput | RejectionOrderByWithRelationInput[]
    cursor?: RejectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RejectionScalarFieldEnum | RejectionScalarFieldEnum[]
  }

  /**
   * Sku without action
   */
  export type SkuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
  }


  /**
   * Model Process
   */

  export type AggregateProcess = {
    _count: ProcessCountAggregateOutputType | null
    _avg: ProcessAvgAggregateOutputType | null
    _sum: ProcessSumAggregateOutputType | null
    _min: ProcessMinAggregateOutputType | null
    _max: ProcessMaxAggregateOutputType | null
  }

  export type ProcessAvgAggregateOutputType = {
    defaultSequence: number | null
  }

  export type ProcessSumAggregateOutputType = {
    defaultSequence: number | null
  }

  export type ProcessMinAggregateOutputType = {
    id: string | null
    processCode: string | null
    processName: string | null
    department: string | null
    defaultSequence: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProcessMaxAggregateOutputType = {
    id: string | null
    processCode: string | null
    processName: string | null
    department: string | null
    defaultSequence: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProcessCountAggregateOutputType = {
    id: number
    processCode: number
    processName: number
    department: number
    defaultSequence: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProcessAvgAggregateInputType = {
    defaultSequence?: true
  }

  export type ProcessSumAggregateInputType = {
    defaultSequence?: true
  }

  export type ProcessMinAggregateInputType = {
    id?: true
    processCode?: true
    processName?: true
    department?: true
    defaultSequence?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProcessMaxAggregateInputType = {
    id?: true
    processCode?: true
    processName?: true
    department?: true
    defaultSequence?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProcessCountAggregateInputType = {
    id?: true
    processCode?: true
    processName?: true
    department?: true
    defaultSequence?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProcessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Process to aggregate.
     */
    where?: ProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processes to fetch.
     */
    orderBy?: ProcessOrderByWithRelationInput | ProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Processes
    **/
    _count?: true | ProcessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessMaxAggregateInputType
  }

  export type GetProcessAggregateType<T extends ProcessAggregateArgs> = {
        [P in keyof T & keyof AggregateProcess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcess[P]>
      : GetScalarType<T[P], AggregateProcess[P]>
  }




  export type ProcessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessWhereInput
    orderBy?: ProcessOrderByWithAggregationInput | ProcessOrderByWithAggregationInput[]
    by: ProcessScalarFieldEnum[] | ProcessScalarFieldEnum
    having?: ProcessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessCountAggregateInputType | true
    _avg?: ProcessAvgAggregateInputType
    _sum?: ProcessSumAggregateInputType
    _min?: ProcessMinAggregateInputType
    _max?: ProcessMaxAggregateInputType
  }

  export type ProcessGroupByOutputType = {
    id: string
    processCode: string
    processName: string
    department: string | null
    defaultSequence: number
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProcessCountAggregateOutputType | null
    _avg: ProcessAvgAggregateOutputType | null
    _sum: ProcessSumAggregateOutputType | null
    _min: ProcessMinAggregateOutputType | null
    _max: ProcessMaxAggregateOutputType | null
  }

  type GetProcessGroupByPayload<T extends ProcessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessGroupByOutputType[P]>
        }
      >
    >


  export type ProcessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    processCode?: boolean
    processName?: boolean
    department?: boolean
    defaultSequence?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    skuProcesses?: boolean | Process$skuProcessesArgs<ExtArgs>
    _count?: boolean | ProcessCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["process"]>

  export type ProcessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    processCode?: boolean
    processName?: boolean
    department?: boolean
    defaultSequence?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["process"]>

  export type ProcessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    processCode?: boolean
    processName?: boolean
    department?: boolean
    defaultSequence?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["process"]>

  export type ProcessSelectScalar = {
    id?: boolean
    processCode?: boolean
    processName?: boolean
    department?: boolean
    defaultSequence?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProcessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "processCode" | "processName" | "department" | "defaultSequence" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["process"]>
  export type ProcessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skuProcesses?: boolean | Process$skuProcessesArgs<ExtArgs>
    _count?: boolean | ProcessCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProcessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProcessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProcessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Process"
    objects: {
      skuProcesses: Prisma.$SkuProcessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      processCode: string
      processName: string
      department: string | null
      defaultSequence: number
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["process"]>
    composites: {}
  }

  type ProcessGetPayload<S extends boolean | null | undefined | ProcessDefaultArgs> = $Result.GetResult<Prisma.$ProcessPayload, S>

  type ProcessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessCountAggregateInputType | true
    }

  export interface ProcessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Process'], meta: { name: 'Process' } }
    /**
     * Find zero or one Process that matches the filter.
     * @param {ProcessFindUniqueArgs} args - Arguments to find a Process
     * @example
     * // Get one Process
     * const process = await prisma.process.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessFindUniqueArgs>(args: SelectSubset<T, ProcessFindUniqueArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Process that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessFindUniqueOrThrowArgs} args - Arguments to find a Process
     * @example
     * // Get one Process
     * const process = await prisma.process.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Process that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessFindFirstArgs} args - Arguments to find a Process
     * @example
     * // Get one Process
     * const process = await prisma.process.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessFindFirstArgs>(args?: SelectSubset<T, ProcessFindFirstArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Process that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessFindFirstOrThrowArgs} args - Arguments to find a Process
     * @example
     * // Get one Process
     * const process = await prisma.process.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Processes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Processes
     * const processes = await prisma.process.findMany()
     * 
     * // Get first 10 Processes
     * const processes = await prisma.process.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processWithIdOnly = await prisma.process.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessFindManyArgs>(args?: SelectSubset<T, ProcessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Process.
     * @param {ProcessCreateArgs} args - Arguments to create a Process.
     * @example
     * // Create one Process
     * const Process = await prisma.process.create({
     *   data: {
     *     // ... data to create a Process
     *   }
     * })
     * 
     */
    create<T extends ProcessCreateArgs>(args: SelectSubset<T, ProcessCreateArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Processes.
     * @param {ProcessCreateManyArgs} args - Arguments to create many Processes.
     * @example
     * // Create many Processes
     * const process = await prisma.process.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessCreateManyArgs>(args?: SelectSubset<T, ProcessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Processes and returns the data saved in the database.
     * @param {ProcessCreateManyAndReturnArgs} args - Arguments to create many Processes.
     * @example
     * // Create many Processes
     * const process = await prisma.process.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Processes and only return the `id`
     * const processWithIdOnly = await prisma.process.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Process.
     * @param {ProcessDeleteArgs} args - Arguments to delete one Process.
     * @example
     * // Delete one Process
     * const Process = await prisma.process.delete({
     *   where: {
     *     // ... filter to delete one Process
     *   }
     * })
     * 
     */
    delete<T extends ProcessDeleteArgs>(args: SelectSubset<T, ProcessDeleteArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Process.
     * @param {ProcessUpdateArgs} args - Arguments to update one Process.
     * @example
     * // Update one Process
     * const process = await prisma.process.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessUpdateArgs>(args: SelectSubset<T, ProcessUpdateArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Processes.
     * @param {ProcessDeleteManyArgs} args - Arguments to filter Processes to delete.
     * @example
     * // Delete a few Processes
     * const { count } = await prisma.process.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessDeleteManyArgs>(args?: SelectSubset<T, ProcessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Processes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Processes
     * const process = await prisma.process.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessUpdateManyArgs>(args: SelectSubset<T, ProcessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Processes and returns the data updated in the database.
     * @param {ProcessUpdateManyAndReturnArgs} args - Arguments to update many Processes.
     * @example
     * // Update many Processes
     * const process = await prisma.process.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Processes and only return the `id`
     * const processWithIdOnly = await prisma.process.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Process.
     * @param {ProcessUpsertArgs} args - Arguments to update or create a Process.
     * @example
     * // Update or create a Process
     * const process = await prisma.process.upsert({
     *   create: {
     *     // ... data to create a Process
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Process we want to update
     *   }
     * })
     */
    upsert<T extends ProcessUpsertArgs>(args: SelectSubset<T, ProcessUpsertArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Processes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessCountArgs} args - Arguments to filter Processes to count.
     * @example
     * // Count the number of Processes
     * const count = await prisma.process.count({
     *   where: {
     *     // ... the filter for the Processes we want to count
     *   }
     * })
    **/
    count<T extends ProcessCountArgs>(
      args?: Subset<T, ProcessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Process.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessAggregateArgs>(args: Subset<T, ProcessAggregateArgs>): Prisma.PrismaPromise<GetProcessAggregateType<T>>

    /**
     * Group by Process.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessGroupByArgs['orderBy'] }
        : { orderBy?: ProcessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Process model
   */
  readonly fields: ProcessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Process.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    skuProcesses<T extends Process$skuProcessesArgs<ExtArgs> = {}>(args?: Subset<T, Process$skuProcessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Process model
   */
  interface ProcessFieldRefs {
    readonly id: FieldRef<"Process", 'String'>
    readonly processCode: FieldRef<"Process", 'String'>
    readonly processName: FieldRef<"Process", 'String'>
    readonly department: FieldRef<"Process", 'String'>
    readonly defaultSequence: FieldRef<"Process", 'Int'>
    readonly description: FieldRef<"Process", 'String'>
    readonly isActive: FieldRef<"Process", 'Boolean'>
    readonly createdAt: FieldRef<"Process", 'DateTime'>
    readonly updatedAt: FieldRef<"Process", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Process findUnique
   */
  export type ProcessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * Filter, which Process to fetch.
     */
    where: ProcessWhereUniqueInput
  }

  /**
   * Process findUniqueOrThrow
   */
  export type ProcessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * Filter, which Process to fetch.
     */
    where: ProcessWhereUniqueInput
  }

  /**
   * Process findFirst
   */
  export type ProcessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * Filter, which Process to fetch.
     */
    where?: ProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processes to fetch.
     */
    orderBy?: ProcessOrderByWithRelationInput | ProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Processes.
     */
    cursor?: ProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Processes.
     */
    distinct?: ProcessScalarFieldEnum | ProcessScalarFieldEnum[]
  }

  /**
   * Process findFirstOrThrow
   */
  export type ProcessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * Filter, which Process to fetch.
     */
    where?: ProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processes to fetch.
     */
    orderBy?: ProcessOrderByWithRelationInput | ProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Processes.
     */
    cursor?: ProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Processes.
     */
    distinct?: ProcessScalarFieldEnum | ProcessScalarFieldEnum[]
  }

  /**
   * Process findMany
   */
  export type ProcessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * Filter, which Processes to fetch.
     */
    where?: ProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Processes to fetch.
     */
    orderBy?: ProcessOrderByWithRelationInput | ProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Processes.
     */
    cursor?: ProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Processes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Processes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Processes.
     */
    distinct?: ProcessScalarFieldEnum | ProcessScalarFieldEnum[]
  }

  /**
   * Process create
   */
  export type ProcessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * The data needed to create a Process.
     */
    data: XOR<ProcessCreateInput, ProcessUncheckedCreateInput>
  }

  /**
   * Process createMany
   */
  export type ProcessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Processes.
     */
    data: ProcessCreateManyInput | ProcessCreateManyInput[]
  }

  /**
   * Process createManyAndReturn
   */
  export type ProcessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * The data used to create many Processes.
     */
    data: ProcessCreateManyInput | ProcessCreateManyInput[]
  }

  /**
   * Process update
   */
  export type ProcessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * The data needed to update a Process.
     */
    data: XOR<ProcessUpdateInput, ProcessUncheckedUpdateInput>
    /**
     * Choose, which Process to update.
     */
    where: ProcessWhereUniqueInput
  }

  /**
   * Process updateMany
   */
  export type ProcessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Processes.
     */
    data: XOR<ProcessUpdateManyMutationInput, ProcessUncheckedUpdateManyInput>
    /**
     * Filter which Processes to update
     */
    where?: ProcessWhereInput
    /**
     * Limit how many Processes to update.
     */
    limit?: number
  }

  /**
   * Process updateManyAndReturn
   */
  export type ProcessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * The data used to update Processes.
     */
    data: XOR<ProcessUpdateManyMutationInput, ProcessUncheckedUpdateManyInput>
    /**
     * Filter which Processes to update
     */
    where?: ProcessWhereInput
    /**
     * Limit how many Processes to update.
     */
    limit?: number
  }

  /**
   * Process upsert
   */
  export type ProcessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * The filter to search for the Process to update in case it exists.
     */
    where: ProcessWhereUniqueInput
    /**
     * In case the Process found by the `where` argument doesn't exist, create a new Process with this data.
     */
    create: XOR<ProcessCreateInput, ProcessUncheckedCreateInput>
    /**
     * In case the Process was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessUpdateInput, ProcessUncheckedUpdateInput>
  }

  /**
   * Process delete
   */
  export type ProcessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
    /**
     * Filter which Process to delete.
     */
    where: ProcessWhereUniqueInput
  }

  /**
   * Process deleteMany
   */
  export type ProcessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Processes to delete
     */
    where?: ProcessWhereInput
    /**
     * Limit how many Processes to delete.
     */
    limit?: number
  }

  /**
   * Process.skuProcesses
   */
  export type Process$skuProcessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    where?: SkuProcessWhereInput
    orderBy?: SkuProcessOrderByWithRelationInput | SkuProcessOrderByWithRelationInput[]
    cursor?: SkuProcessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkuProcessScalarFieldEnum | SkuProcessScalarFieldEnum[]
  }

  /**
   * Process without action
   */
  export type ProcessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Process
     */
    select?: ProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Process
     */
    omit?: ProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessInclude<ExtArgs> | null
  }


  /**
   * Model SkuProcess
   */

  export type AggregateSkuProcess = {
    _count: SkuProcessCountAggregateOutputType | null
    _avg: SkuProcessAvgAggregateOutputType | null
    _sum: SkuProcessSumAggregateOutputType | null
    _min: SkuProcessMinAggregateOutputType | null
    _max: SkuProcessMaxAggregateOutputType | null
  }

  export type SkuProcessAvgAggregateOutputType = {
    sequence: number | null
  }

  export type SkuProcessSumAggregateOutputType = {
    sequence: number | null
  }

  export type SkuProcessMinAggregateOutputType = {
    id: string | null
    skuId: string | null
    processId: string | null
    sequence: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkuProcessMaxAggregateOutputType = {
    id: string | null
    skuId: string | null
    processId: string | null
    sequence: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkuProcessCountAggregateOutputType = {
    id: number
    skuId: number
    processId: number
    sequence: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SkuProcessAvgAggregateInputType = {
    sequence?: true
  }

  export type SkuProcessSumAggregateInputType = {
    sequence?: true
  }

  export type SkuProcessMinAggregateInputType = {
    id?: true
    skuId?: true
    processId?: true
    sequence?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkuProcessMaxAggregateInputType = {
    id?: true
    skuId?: true
    processId?: true
    sequence?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkuProcessCountAggregateInputType = {
    id?: true
    skuId?: true
    processId?: true
    sequence?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SkuProcessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkuProcess to aggregate.
     */
    where?: SkuProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkuProcesses to fetch.
     */
    orderBy?: SkuProcessOrderByWithRelationInput | SkuProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkuProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkuProcesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkuProcesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkuProcesses
    **/
    _count?: true | SkuProcessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkuProcessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkuProcessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkuProcessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkuProcessMaxAggregateInputType
  }

  export type GetSkuProcessAggregateType<T extends SkuProcessAggregateArgs> = {
        [P in keyof T & keyof AggregateSkuProcess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkuProcess[P]>
      : GetScalarType<T[P], AggregateSkuProcess[P]>
  }




  export type SkuProcessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkuProcessWhereInput
    orderBy?: SkuProcessOrderByWithAggregationInput | SkuProcessOrderByWithAggregationInput[]
    by: SkuProcessScalarFieldEnum[] | SkuProcessScalarFieldEnum
    having?: SkuProcessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkuProcessCountAggregateInputType | true
    _avg?: SkuProcessAvgAggregateInputType
    _sum?: SkuProcessSumAggregateInputType
    _min?: SkuProcessMinAggregateInputType
    _max?: SkuProcessMaxAggregateInputType
  }

  export type SkuProcessGroupByOutputType = {
    id: string
    skuId: string
    processId: string
    sequence: number
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: SkuProcessCountAggregateOutputType | null
    _avg: SkuProcessAvgAggregateOutputType | null
    _sum: SkuProcessSumAggregateOutputType | null
    _min: SkuProcessMinAggregateOutputType | null
    _max: SkuProcessMaxAggregateOutputType | null
  }

  type GetSkuProcessGroupByPayload<T extends SkuProcessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkuProcessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkuProcessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkuProcessGroupByOutputType[P]>
            : GetScalarType<T[P], SkuProcessGroupByOutputType[P]>
        }
      >
    >


  export type SkuProcessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuId?: boolean
    processId?: boolean
    sequence?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sku?: boolean | SkuDefaultArgs<ExtArgs>
    process?: boolean | ProcessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skuProcess"]>

  export type SkuProcessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuId?: boolean
    processId?: boolean
    sequence?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sku?: boolean | SkuDefaultArgs<ExtArgs>
    process?: boolean | ProcessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skuProcess"]>

  export type SkuProcessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    skuId?: boolean
    processId?: boolean
    sequence?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sku?: boolean | SkuDefaultArgs<ExtArgs>
    process?: boolean | ProcessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skuProcess"]>

  export type SkuProcessSelectScalar = {
    id?: boolean
    skuId?: boolean
    processId?: boolean
    sequence?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SkuProcessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "skuId" | "processId" | "sequence" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["skuProcess"]>
  export type SkuProcessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sku?: boolean | SkuDefaultArgs<ExtArgs>
    process?: boolean | ProcessDefaultArgs<ExtArgs>
  }
  export type SkuProcessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sku?: boolean | SkuDefaultArgs<ExtArgs>
    process?: boolean | ProcessDefaultArgs<ExtArgs>
  }
  export type SkuProcessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sku?: boolean | SkuDefaultArgs<ExtArgs>
    process?: boolean | ProcessDefaultArgs<ExtArgs>
  }

  export type $SkuProcessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkuProcess"
    objects: {
      sku: Prisma.$SkuPayload<ExtArgs>
      process: Prisma.$ProcessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      skuId: string
      processId: string
      sequence: number
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["skuProcess"]>
    composites: {}
  }

  type SkuProcessGetPayload<S extends boolean | null | undefined | SkuProcessDefaultArgs> = $Result.GetResult<Prisma.$SkuProcessPayload, S>

  type SkuProcessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkuProcessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkuProcessCountAggregateInputType | true
    }

  export interface SkuProcessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkuProcess'], meta: { name: 'SkuProcess' } }
    /**
     * Find zero or one SkuProcess that matches the filter.
     * @param {SkuProcessFindUniqueArgs} args - Arguments to find a SkuProcess
     * @example
     * // Get one SkuProcess
     * const skuProcess = await prisma.skuProcess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkuProcessFindUniqueArgs>(args: SelectSubset<T, SkuProcessFindUniqueArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkuProcess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkuProcessFindUniqueOrThrowArgs} args - Arguments to find a SkuProcess
     * @example
     * // Get one SkuProcess
     * const skuProcess = await prisma.skuProcess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkuProcessFindUniqueOrThrowArgs>(args: SelectSubset<T, SkuProcessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkuProcess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuProcessFindFirstArgs} args - Arguments to find a SkuProcess
     * @example
     * // Get one SkuProcess
     * const skuProcess = await prisma.skuProcess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkuProcessFindFirstArgs>(args?: SelectSubset<T, SkuProcessFindFirstArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkuProcess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuProcessFindFirstOrThrowArgs} args - Arguments to find a SkuProcess
     * @example
     * // Get one SkuProcess
     * const skuProcess = await prisma.skuProcess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkuProcessFindFirstOrThrowArgs>(args?: SelectSubset<T, SkuProcessFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkuProcesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuProcessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkuProcesses
     * const skuProcesses = await prisma.skuProcess.findMany()
     * 
     * // Get first 10 SkuProcesses
     * const skuProcesses = await prisma.skuProcess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skuProcessWithIdOnly = await prisma.skuProcess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkuProcessFindManyArgs>(args?: SelectSubset<T, SkuProcessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkuProcess.
     * @param {SkuProcessCreateArgs} args - Arguments to create a SkuProcess.
     * @example
     * // Create one SkuProcess
     * const SkuProcess = await prisma.skuProcess.create({
     *   data: {
     *     // ... data to create a SkuProcess
     *   }
     * })
     * 
     */
    create<T extends SkuProcessCreateArgs>(args: SelectSubset<T, SkuProcessCreateArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkuProcesses.
     * @param {SkuProcessCreateManyArgs} args - Arguments to create many SkuProcesses.
     * @example
     * // Create many SkuProcesses
     * const skuProcess = await prisma.skuProcess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkuProcessCreateManyArgs>(args?: SelectSubset<T, SkuProcessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SkuProcesses and returns the data saved in the database.
     * @param {SkuProcessCreateManyAndReturnArgs} args - Arguments to create many SkuProcesses.
     * @example
     * // Create many SkuProcesses
     * const skuProcess = await prisma.skuProcess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SkuProcesses and only return the `id`
     * const skuProcessWithIdOnly = await prisma.skuProcess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkuProcessCreateManyAndReturnArgs>(args?: SelectSubset<T, SkuProcessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SkuProcess.
     * @param {SkuProcessDeleteArgs} args - Arguments to delete one SkuProcess.
     * @example
     * // Delete one SkuProcess
     * const SkuProcess = await prisma.skuProcess.delete({
     *   where: {
     *     // ... filter to delete one SkuProcess
     *   }
     * })
     * 
     */
    delete<T extends SkuProcessDeleteArgs>(args: SelectSubset<T, SkuProcessDeleteArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkuProcess.
     * @param {SkuProcessUpdateArgs} args - Arguments to update one SkuProcess.
     * @example
     * // Update one SkuProcess
     * const skuProcess = await prisma.skuProcess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkuProcessUpdateArgs>(args: SelectSubset<T, SkuProcessUpdateArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkuProcesses.
     * @param {SkuProcessDeleteManyArgs} args - Arguments to filter SkuProcesses to delete.
     * @example
     * // Delete a few SkuProcesses
     * const { count } = await prisma.skuProcess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkuProcessDeleteManyArgs>(args?: SelectSubset<T, SkuProcessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkuProcesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuProcessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkuProcesses
     * const skuProcess = await prisma.skuProcess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkuProcessUpdateManyArgs>(args: SelectSubset<T, SkuProcessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkuProcesses and returns the data updated in the database.
     * @param {SkuProcessUpdateManyAndReturnArgs} args - Arguments to update many SkuProcesses.
     * @example
     * // Update many SkuProcesses
     * const skuProcess = await prisma.skuProcess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SkuProcesses and only return the `id`
     * const skuProcessWithIdOnly = await prisma.skuProcess.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SkuProcessUpdateManyAndReturnArgs>(args: SelectSubset<T, SkuProcessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SkuProcess.
     * @param {SkuProcessUpsertArgs} args - Arguments to update or create a SkuProcess.
     * @example
     * // Update or create a SkuProcess
     * const skuProcess = await prisma.skuProcess.upsert({
     *   create: {
     *     // ... data to create a SkuProcess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkuProcess we want to update
     *   }
     * })
     */
    upsert<T extends SkuProcessUpsertArgs>(args: SelectSubset<T, SkuProcessUpsertArgs<ExtArgs>>): Prisma__SkuProcessClient<$Result.GetResult<Prisma.$SkuProcessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SkuProcesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuProcessCountArgs} args - Arguments to filter SkuProcesses to count.
     * @example
     * // Count the number of SkuProcesses
     * const count = await prisma.skuProcess.count({
     *   where: {
     *     // ... the filter for the SkuProcesses we want to count
     *   }
     * })
    **/
    count<T extends SkuProcessCountArgs>(
      args?: Subset<T, SkuProcessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkuProcessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkuProcess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuProcessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkuProcessAggregateArgs>(args: Subset<T, SkuProcessAggregateArgs>): Prisma.PrismaPromise<GetSkuProcessAggregateType<T>>

    /**
     * Group by SkuProcess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkuProcessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkuProcessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkuProcessGroupByArgs['orderBy'] }
        : { orderBy?: SkuProcessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkuProcessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkuProcessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkuProcess model
   */
  readonly fields: SkuProcessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkuProcess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkuProcessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sku<T extends SkuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkuDefaultArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    process<T extends ProcessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProcessDefaultArgs<ExtArgs>>): Prisma__ProcessClient<$Result.GetResult<Prisma.$ProcessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SkuProcess model
   */
  interface SkuProcessFieldRefs {
    readonly id: FieldRef<"SkuProcess", 'String'>
    readonly skuId: FieldRef<"SkuProcess", 'String'>
    readonly processId: FieldRef<"SkuProcess", 'String'>
    readonly sequence: FieldRef<"SkuProcess", 'Int'>
    readonly notes: FieldRef<"SkuProcess", 'String'>
    readonly createdAt: FieldRef<"SkuProcess", 'DateTime'>
    readonly updatedAt: FieldRef<"SkuProcess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SkuProcess findUnique
   */
  export type SkuProcessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * Filter, which SkuProcess to fetch.
     */
    where: SkuProcessWhereUniqueInput
  }

  /**
   * SkuProcess findUniqueOrThrow
   */
  export type SkuProcessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * Filter, which SkuProcess to fetch.
     */
    where: SkuProcessWhereUniqueInput
  }

  /**
   * SkuProcess findFirst
   */
  export type SkuProcessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * Filter, which SkuProcess to fetch.
     */
    where?: SkuProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkuProcesses to fetch.
     */
    orderBy?: SkuProcessOrderByWithRelationInput | SkuProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkuProcesses.
     */
    cursor?: SkuProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkuProcesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkuProcesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkuProcesses.
     */
    distinct?: SkuProcessScalarFieldEnum | SkuProcessScalarFieldEnum[]
  }

  /**
   * SkuProcess findFirstOrThrow
   */
  export type SkuProcessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * Filter, which SkuProcess to fetch.
     */
    where?: SkuProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkuProcesses to fetch.
     */
    orderBy?: SkuProcessOrderByWithRelationInput | SkuProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkuProcesses.
     */
    cursor?: SkuProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkuProcesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkuProcesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkuProcesses.
     */
    distinct?: SkuProcessScalarFieldEnum | SkuProcessScalarFieldEnum[]
  }

  /**
   * SkuProcess findMany
   */
  export type SkuProcessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * Filter, which SkuProcesses to fetch.
     */
    where?: SkuProcessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkuProcesses to fetch.
     */
    orderBy?: SkuProcessOrderByWithRelationInput | SkuProcessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkuProcesses.
     */
    cursor?: SkuProcessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkuProcesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkuProcesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkuProcesses.
     */
    distinct?: SkuProcessScalarFieldEnum | SkuProcessScalarFieldEnum[]
  }

  /**
   * SkuProcess create
   */
  export type SkuProcessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * The data needed to create a SkuProcess.
     */
    data: XOR<SkuProcessCreateInput, SkuProcessUncheckedCreateInput>
  }

  /**
   * SkuProcess createMany
   */
  export type SkuProcessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkuProcesses.
     */
    data: SkuProcessCreateManyInput | SkuProcessCreateManyInput[]
  }

  /**
   * SkuProcess createManyAndReturn
   */
  export type SkuProcessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * The data used to create many SkuProcesses.
     */
    data: SkuProcessCreateManyInput | SkuProcessCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SkuProcess update
   */
  export type SkuProcessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * The data needed to update a SkuProcess.
     */
    data: XOR<SkuProcessUpdateInput, SkuProcessUncheckedUpdateInput>
    /**
     * Choose, which SkuProcess to update.
     */
    where: SkuProcessWhereUniqueInput
  }

  /**
   * SkuProcess updateMany
   */
  export type SkuProcessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkuProcesses.
     */
    data: XOR<SkuProcessUpdateManyMutationInput, SkuProcessUncheckedUpdateManyInput>
    /**
     * Filter which SkuProcesses to update
     */
    where?: SkuProcessWhereInput
    /**
     * Limit how many SkuProcesses to update.
     */
    limit?: number
  }

  /**
   * SkuProcess updateManyAndReturn
   */
  export type SkuProcessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * The data used to update SkuProcesses.
     */
    data: XOR<SkuProcessUpdateManyMutationInput, SkuProcessUncheckedUpdateManyInput>
    /**
     * Filter which SkuProcesses to update
     */
    where?: SkuProcessWhereInput
    /**
     * Limit how many SkuProcesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SkuProcess upsert
   */
  export type SkuProcessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * The filter to search for the SkuProcess to update in case it exists.
     */
    where: SkuProcessWhereUniqueInput
    /**
     * In case the SkuProcess found by the `where` argument doesn't exist, create a new SkuProcess with this data.
     */
    create: XOR<SkuProcessCreateInput, SkuProcessUncheckedCreateInput>
    /**
     * In case the SkuProcess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkuProcessUpdateInput, SkuProcessUncheckedUpdateInput>
  }

  /**
   * SkuProcess delete
   */
  export type SkuProcessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
    /**
     * Filter which SkuProcess to delete.
     */
    where: SkuProcessWhereUniqueInput
  }

  /**
   * SkuProcess deleteMany
   */
  export type SkuProcessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkuProcesses to delete
     */
    where?: SkuProcessWhereInput
    /**
     * Limit how many SkuProcesses to delete.
     */
    limit?: number
  }

  /**
   * SkuProcess without action
   */
  export type SkuProcessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkuProcess
     */
    select?: SkuProcessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkuProcess
     */
    omit?: SkuProcessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuProcessInclude<ExtArgs> | null
  }


  /**
   * Model Rejection
   */

  export type AggregateRejection = {
    _count: RejectionCountAggregateOutputType | null
    _avg: RejectionAvgAggregateOutputType | null
    _sum: RejectionSumAggregateOutputType | null
    _min: RejectionMinAggregateOutputType | null
    _max: RejectionMaxAggregateOutputType | null
  }

  export type RejectionAvgAggregateOutputType = {
    rejectionCount: number | null
  }

  export type RejectionSumAggregateOutputType = {
    rejectionCount: number | null
  }

  export type RejectionMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    skuId: string | null
    productionOrderRef: string | null
    rejectionCount: number | null
    rejectionReason: string | null
    rejectionDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RejectionMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    skuId: string | null
    productionOrderRef: string | null
    rejectionCount: number | null
    rejectionReason: string | null
    rejectionDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RejectionCountAggregateOutputType = {
    id: number
    customerId: number
    skuId: number
    productionOrderRef: number
    rejectionCount: number
    rejectionReason: number
    rejectionDate: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RejectionAvgAggregateInputType = {
    rejectionCount?: true
  }

  export type RejectionSumAggregateInputType = {
    rejectionCount?: true
  }

  export type RejectionMinAggregateInputType = {
    id?: true
    customerId?: true
    skuId?: true
    productionOrderRef?: true
    rejectionCount?: true
    rejectionReason?: true
    rejectionDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RejectionMaxAggregateInputType = {
    id?: true
    customerId?: true
    skuId?: true
    productionOrderRef?: true
    rejectionCount?: true
    rejectionReason?: true
    rejectionDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RejectionCountAggregateInputType = {
    id?: true
    customerId?: true
    skuId?: true
    productionOrderRef?: true
    rejectionCount?: true
    rejectionReason?: true
    rejectionDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RejectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rejection to aggregate.
     */
    where?: RejectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rejections to fetch.
     */
    orderBy?: RejectionOrderByWithRelationInput | RejectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RejectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rejections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rejections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rejections
    **/
    _count?: true | RejectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RejectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RejectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RejectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RejectionMaxAggregateInputType
  }

  export type GetRejectionAggregateType<T extends RejectionAggregateArgs> = {
        [P in keyof T & keyof AggregateRejection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRejection[P]>
      : GetScalarType<T[P], AggregateRejection[P]>
  }




  export type RejectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RejectionWhereInput
    orderBy?: RejectionOrderByWithAggregationInput | RejectionOrderByWithAggregationInput[]
    by: RejectionScalarFieldEnum[] | RejectionScalarFieldEnum
    having?: RejectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RejectionCountAggregateInputType | true
    _avg?: RejectionAvgAggregateInputType
    _sum?: RejectionSumAggregateInputType
    _min?: RejectionMinAggregateInputType
    _max?: RejectionMaxAggregateInputType
  }

  export type RejectionGroupByOutputType = {
    id: string
    customerId: string
    skuId: string | null
    productionOrderRef: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: RejectionCountAggregateOutputType | null
    _avg: RejectionAvgAggregateOutputType | null
    _sum: RejectionSumAggregateOutputType | null
    _min: RejectionMinAggregateOutputType | null
    _max: RejectionMaxAggregateOutputType | null
  }

  type GetRejectionGroupByPayload<T extends RejectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RejectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RejectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RejectionGroupByOutputType[P]>
            : GetScalarType<T[P], RejectionGroupByOutputType[P]>
        }
      >
    >


  export type RejectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    skuId?: boolean
    productionOrderRef?: boolean
    rejectionCount?: boolean
    rejectionReason?: boolean
    rejectionDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    sku?: boolean | Rejection$skuArgs<ExtArgs>
  }, ExtArgs["result"]["rejection"]>

  export type RejectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    skuId?: boolean
    productionOrderRef?: boolean
    rejectionCount?: boolean
    rejectionReason?: boolean
    rejectionDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    sku?: boolean | Rejection$skuArgs<ExtArgs>
  }, ExtArgs["result"]["rejection"]>

  export type RejectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    skuId?: boolean
    productionOrderRef?: boolean
    rejectionCount?: boolean
    rejectionReason?: boolean
    rejectionDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    sku?: boolean | Rejection$skuArgs<ExtArgs>
  }, ExtArgs["result"]["rejection"]>

  export type RejectionSelectScalar = {
    id?: boolean
    customerId?: boolean
    skuId?: boolean
    productionOrderRef?: boolean
    rejectionCount?: boolean
    rejectionReason?: boolean
    rejectionDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RejectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "skuId" | "productionOrderRef" | "rejectionCount" | "rejectionReason" | "rejectionDate" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["rejection"]>
  export type RejectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    sku?: boolean | Rejection$skuArgs<ExtArgs>
  }
  export type RejectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    sku?: boolean | Rejection$skuArgs<ExtArgs>
  }
  export type RejectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    sku?: boolean | Rejection$skuArgs<ExtArgs>
  }

  export type $RejectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rejection"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      sku: Prisma.$SkuPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      skuId: string | null
      productionOrderRef: string | null
      rejectionCount: number
      rejectionReason: string
      rejectionDate: Date
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rejection"]>
    composites: {}
  }

  type RejectionGetPayload<S extends boolean | null | undefined | RejectionDefaultArgs> = $Result.GetResult<Prisma.$RejectionPayload, S>

  type RejectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RejectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RejectionCountAggregateInputType | true
    }

  export interface RejectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rejection'], meta: { name: 'Rejection' } }
    /**
     * Find zero or one Rejection that matches the filter.
     * @param {RejectionFindUniqueArgs} args - Arguments to find a Rejection
     * @example
     * // Get one Rejection
     * const rejection = await prisma.rejection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RejectionFindUniqueArgs>(args: SelectSubset<T, RejectionFindUniqueArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rejection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RejectionFindUniqueOrThrowArgs} args - Arguments to find a Rejection
     * @example
     * // Get one Rejection
     * const rejection = await prisma.rejection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RejectionFindUniqueOrThrowArgs>(args: SelectSubset<T, RejectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rejection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RejectionFindFirstArgs} args - Arguments to find a Rejection
     * @example
     * // Get one Rejection
     * const rejection = await prisma.rejection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RejectionFindFirstArgs>(args?: SelectSubset<T, RejectionFindFirstArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rejection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RejectionFindFirstOrThrowArgs} args - Arguments to find a Rejection
     * @example
     * // Get one Rejection
     * const rejection = await prisma.rejection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RejectionFindFirstOrThrowArgs>(args?: SelectSubset<T, RejectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rejections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RejectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rejections
     * const rejections = await prisma.rejection.findMany()
     * 
     * // Get first 10 Rejections
     * const rejections = await prisma.rejection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rejectionWithIdOnly = await prisma.rejection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RejectionFindManyArgs>(args?: SelectSubset<T, RejectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rejection.
     * @param {RejectionCreateArgs} args - Arguments to create a Rejection.
     * @example
     * // Create one Rejection
     * const Rejection = await prisma.rejection.create({
     *   data: {
     *     // ... data to create a Rejection
     *   }
     * })
     * 
     */
    create<T extends RejectionCreateArgs>(args: SelectSubset<T, RejectionCreateArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rejections.
     * @param {RejectionCreateManyArgs} args - Arguments to create many Rejections.
     * @example
     * // Create many Rejections
     * const rejection = await prisma.rejection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RejectionCreateManyArgs>(args?: SelectSubset<T, RejectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rejections and returns the data saved in the database.
     * @param {RejectionCreateManyAndReturnArgs} args - Arguments to create many Rejections.
     * @example
     * // Create many Rejections
     * const rejection = await prisma.rejection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rejections and only return the `id`
     * const rejectionWithIdOnly = await prisma.rejection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RejectionCreateManyAndReturnArgs>(args?: SelectSubset<T, RejectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rejection.
     * @param {RejectionDeleteArgs} args - Arguments to delete one Rejection.
     * @example
     * // Delete one Rejection
     * const Rejection = await prisma.rejection.delete({
     *   where: {
     *     // ... filter to delete one Rejection
     *   }
     * })
     * 
     */
    delete<T extends RejectionDeleteArgs>(args: SelectSubset<T, RejectionDeleteArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rejection.
     * @param {RejectionUpdateArgs} args - Arguments to update one Rejection.
     * @example
     * // Update one Rejection
     * const rejection = await prisma.rejection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RejectionUpdateArgs>(args: SelectSubset<T, RejectionUpdateArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rejections.
     * @param {RejectionDeleteManyArgs} args - Arguments to filter Rejections to delete.
     * @example
     * // Delete a few Rejections
     * const { count } = await prisma.rejection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RejectionDeleteManyArgs>(args?: SelectSubset<T, RejectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rejections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RejectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rejections
     * const rejection = await prisma.rejection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RejectionUpdateManyArgs>(args: SelectSubset<T, RejectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rejections and returns the data updated in the database.
     * @param {RejectionUpdateManyAndReturnArgs} args - Arguments to update many Rejections.
     * @example
     * // Update many Rejections
     * const rejection = await prisma.rejection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rejections and only return the `id`
     * const rejectionWithIdOnly = await prisma.rejection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RejectionUpdateManyAndReturnArgs>(args: SelectSubset<T, RejectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rejection.
     * @param {RejectionUpsertArgs} args - Arguments to update or create a Rejection.
     * @example
     * // Update or create a Rejection
     * const rejection = await prisma.rejection.upsert({
     *   create: {
     *     // ... data to create a Rejection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rejection we want to update
     *   }
     * })
     */
    upsert<T extends RejectionUpsertArgs>(args: SelectSubset<T, RejectionUpsertArgs<ExtArgs>>): Prisma__RejectionClient<$Result.GetResult<Prisma.$RejectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rejections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RejectionCountArgs} args - Arguments to filter Rejections to count.
     * @example
     * // Count the number of Rejections
     * const count = await prisma.rejection.count({
     *   where: {
     *     // ... the filter for the Rejections we want to count
     *   }
     * })
    **/
    count<T extends RejectionCountArgs>(
      args?: Subset<T, RejectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RejectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rejection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RejectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RejectionAggregateArgs>(args: Subset<T, RejectionAggregateArgs>): Prisma.PrismaPromise<GetRejectionAggregateType<T>>

    /**
     * Group by Rejection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RejectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RejectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RejectionGroupByArgs['orderBy'] }
        : { orderBy?: RejectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RejectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRejectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rejection model
   */
  readonly fields: RejectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rejection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RejectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sku<T extends Rejection$skuArgs<ExtArgs> = {}>(args?: Subset<T, Rejection$skuArgs<ExtArgs>>): Prisma__SkuClient<$Result.GetResult<Prisma.$SkuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rejection model
   */
  interface RejectionFieldRefs {
    readonly id: FieldRef<"Rejection", 'String'>
    readonly customerId: FieldRef<"Rejection", 'String'>
    readonly skuId: FieldRef<"Rejection", 'String'>
    readonly productionOrderRef: FieldRef<"Rejection", 'String'>
    readonly rejectionCount: FieldRef<"Rejection", 'Int'>
    readonly rejectionReason: FieldRef<"Rejection", 'String'>
    readonly rejectionDate: FieldRef<"Rejection", 'DateTime'>
    readonly notes: FieldRef<"Rejection", 'String'>
    readonly createdAt: FieldRef<"Rejection", 'DateTime'>
    readonly updatedAt: FieldRef<"Rejection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rejection findUnique
   */
  export type RejectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * Filter, which Rejection to fetch.
     */
    where: RejectionWhereUniqueInput
  }

  /**
   * Rejection findUniqueOrThrow
   */
  export type RejectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * Filter, which Rejection to fetch.
     */
    where: RejectionWhereUniqueInput
  }

  /**
   * Rejection findFirst
   */
  export type RejectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * Filter, which Rejection to fetch.
     */
    where?: RejectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rejections to fetch.
     */
    orderBy?: RejectionOrderByWithRelationInput | RejectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rejections.
     */
    cursor?: RejectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rejections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rejections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rejections.
     */
    distinct?: RejectionScalarFieldEnum | RejectionScalarFieldEnum[]
  }

  /**
   * Rejection findFirstOrThrow
   */
  export type RejectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * Filter, which Rejection to fetch.
     */
    where?: RejectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rejections to fetch.
     */
    orderBy?: RejectionOrderByWithRelationInput | RejectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rejections.
     */
    cursor?: RejectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rejections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rejections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rejections.
     */
    distinct?: RejectionScalarFieldEnum | RejectionScalarFieldEnum[]
  }

  /**
   * Rejection findMany
   */
  export type RejectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * Filter, which Rejections to fetch.
     */
    where?: RejectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rejections to fetch.
     */
    orderBy?: RejectionOrderByWithRelationInput | RejectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rejections.
     */
    cursor?: RejectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rejections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rejections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rejections.
     */
    distinct?: RejectionScalarFieldEnum | RejectionScalarFieldEnum[]
  }

  /**
   * Rejection create
   */
  export type RejectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Rejection.
     */
    data: XOR<RejectionCreateInput, RejectionUncheckedCreateInput>
  }

  /**
   * Rejection createMany
   */
  export type RejectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rejections.
     */
    data: RejectionCreateManyInput | RejectionCreateManyInput[]
  }

  /**
   * Rejection createManyAndReturn
   */
  export type RejectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * The data used to create many Rejections.
     */
    data: RejectionCreateManyInput | RejectionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rejection update
   */
  export type RejectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Rejection.
     */
    data: XOR<RejectionUpdateInput, RejectionUncheckedUpdateInput>
    /**
     * Choose, which Rejection to update.
     */
    where: RejectionWhereUniqueInput
  }

  /**
   * Rejection updateMany
   */
  export type RejectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rejections.
     */
    data: XOR<RejectionUpdateManyMutationInput, RejectionUncheckedUpdateManyInput>
    /**
     * Filter which Rejections to update
     */
    where?: RejectionWhereInput
    /**
     * Limit how many Rejections to update.
     */
    limit?: number
  }

  /**
   * Rejection updateManyAndReturn
   */
  export type RejectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * The data used to update Rejections.
     */
    data: XOR<RejectionUpdateManyMutationInput, RejectionUncheckedUpdateManyInput>
    /**
     * Filter which Rejections to update
     */
    where?: RejectionWhereInput
    /**
     * Limit how many Rejections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rejection upsert
   */
  export type RejectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Rejection to update in case it exists.
     */
    where: RejectionWhereUniqueInput
    /**
     * In case the Rejection found by the `where` argument doesn't exist, create a new Rejection with this data.
     */
    create: XOR<RejectionCreateInput, RejectionUncheckedCreateInput>
    /**
     * In case the Rejection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RejectionUpdateInput, RejectionUncheckedUpdateInput>
  }

  /**
   * Rejection delete
   */
  export type RejectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
    /**
     * Filter which Rejection to delete.
     */
    where: RejectionWhereUniqueInput
  }

  /**
   * Rejection deleteMany
   */
  export type RejectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rejections to delete
     */
    where?: RejectionWhereInput
    /**
     * Limit how many Rejections to delete.
     */
    limit?: number
  }

  /**
   * Rejection.sku
   */
  export type Rejection$skuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sku
     */
    select?: SkuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sku
     */
    omit?: SkuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkuInclude<ExtArgs> | null
    where?: SkuWhereInput
  }

  /**
   * Rejection without action
   */
  export type RejectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rejection
     */
    select?: RejectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rejection
     */
    omit?: RejectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RejectionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    name: 'name',
    notes: 'notes',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const SkuScalarFieldEnum: {
    id: 'id',
    skuCode: 'skuCode',
    name: 'name',
    category: 'category',
    description: 'description',
    customerId: 'customerId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SkuScalarFieldEnum = (typeof SkuScalarFieldEnum)[keyof typeof SkuScalarFieldEnum]


  export const ProcessScalarFieldEnum: {
    id: 'id',
    processCode: 'processCode',
    processName: 'processName',
    department: 'department',
    defaultSequence: 'defaultSequence',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProcessScalarFieldEnum = (typeof ProcessScalarFieldEnum)[keyof typeof ProcessScalarFieldEnum]


  export const SkuProcessScalarFieldEnum: {
    id: 'id',
    skuId: 'skuId',
    processId: 'processId',
    sequence: 'sequence',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SkuProcessScalarFieldEnum = (typeof SkuProcessScalarFieldEnum)[keyof typeof SkuProcessScalarFieldEnum]


  export const RejectionScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    skuId: 'skuId',
    productionOrderRef: 'productionOrderRef',
    rejectionCount: 'rejectionCount',
    rejectionReason: 'rejectionReason',
    rejectionDate: 'rejectionDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RejectionScalarFieldEnum = (typeof RejectionScalarFieldEnum)[keyof typeof RejectionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    customerId?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    notes?: StringNullableFilter<"Customer"> | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    skus?: SkuListRelationFilter
    rejections?: RejectionListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    notes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    skus?: SkuOrderByRelationAggregateInput
    rejections?: RejectionOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    notes?: StringNullableFilter<"Customer"> | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    skus?: SkuListRelationFilter
    rejections?: RejectionListRelationFilter
  }, "id" | "customerId">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    notes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    customerId?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    notes?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    isActive?: BoolWithAggregatesFilter<"Customer"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type SkuWhereInput = {
    AND?: SkuWhereInput | SkuWhereInput[]
    OR?: SkuWhereInput[]
    NOT?: SkuWhereInput | SkuWhereInput[]
    id?: StringFilter<"Sku"> | string
    skuCode?: StringFilter<"Sku"> | string
    name?: StringFilter<"Sku"> | string
    category?: StringNullableFilter<"Sku"> | string | null
    description?: StringNullableFilter<"Sku"> | string | null
    customerId?: StringFilter<"Sku"> | string
    isActive?: BoolFilter<"Sku"> | boolean
    createdAt?: DateTimeFilter<"Sku"> | Date | string
    updatedAt?: DateTimeFilter<"Sku"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    processes?: SkuProcessListRelationFilter
    rejections?: RejectionListRelationFilter
  }

  export type SkuOrderByWithRelationInput = {
    id?: SortOrder
    skuCode?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    customerId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    processes?: SkuProcessOrderByRelationAggregateInput
    rejections?: RejectionOrderByRelationAggregateInput
  }

  export type SkuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    skuCode?: string
    AND?: SkuWhereInput | SkuWhereInput[]
    OR?: SkuWhereInput[]
    NOT?: SkuWhereInput | SkuWhereInput[]
    name?: StringFilter<"Sku"> | string
    category?: StringNullableFilter<"Sku"> | string | null
    description?: StringNullableFilter<"Sku"> | string | null
    customerId?: StringFilter<"Sku"> | string
    isActive?: BoolFilter<"Sku"> | boolean
    createdAt?: DateTimeFilter<"Sku"> | Date | string
    updatedAt?: DateTimeFilter<"Sku"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    processes?: SkuProcessListRelationFilter
    rejections?: RejectionListRelationFilter
  }, "id" | "skuCode">

  export type SkuOrderByWithAggregationInput = {
    id?: SortOrder
    skuCode?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    customerId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SkuCountOrderByAggregateInput
    _max?: SkuMaxOrderByAggregateInput
    _min?: SkuMinOrderByAggregateInput
  }

  export type SkuScalarWhereWithAggregatesInput = {
    AND?: SkuScalarWhereWithAggregatesInput | SkuScalarWhereWithAggregatesInput[]
    OR?: SkuScalarWhereWithAggregatesInput[]
    NOT?: SkuScalarWhereWithAggregatesInput | SkuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sku"> | string
    skuCode?: StringWithAggregatesFilter<"Sku"> | string
    name?: StringWithAggregatesFilter<"Sku"> | string
    category?: StringNullableWithAggregatesFilter<"Sku"> | string | null
    description?: StringNullableWithAggregatesFilter<"Sku"> | string | null
    customerId?: StringWithAggregatesFilter<"Sku"> | string
    isActive?: BoolWithAggregatesFilter<"Sku"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Sku"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sku"> | Date | string
  }

  export type ProcessWhereInput = {
    AND?: ProcessWhereInput | ProcessWhereInput[]
    OR?: ProcessWhereInput[]
    NOT?: ProcessWhereInput | ProcessWhereInput[]
    id?: StringFilter<"Process"> | string
    processCode?: StringFilter<"Process"> | string
    processName?: StringFilter<"Process"> | string
    department?: StringNullableFilter<"Process"> | string | null
    defaultSequence?: IntFilter<"Process"> | number
    description?: StringNullableFilter<"Process"> | string | null
    isActive?: BoolFilter<"Process"> | boolean
    createdAt?: DateTimeFilter<"Process"> | Date | string
    updatedAt?: DateTimeFilter<"Process"> | Date | string
    skuProcesses?: SkuProcessListRelationFilter
  }

  export type ProcessOrderByWithRelationInput = {
    id?: SortOrder
    processCode?: SortOrder
    processName?: SortOrder
    department?: SortOrderInput | SortOrder
    defaultSequence?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    skuProcesses?: SkuProcessOrderByRelationAggregateInput
  }

  export type ProcessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    processCode?: string
    AND?: ProcessWhereInput | ProcessWhereInput[]
    OR?: ProcessWhereInput[]
    NOT?: ProcessWhereInput | ProcessWhereInput[]
    processName?: StringFilter<"Process"> | string
    department?: StringNullableFilter<"Process"> | string | null
    defaultSequence?: IntFilter<"Process"> | number
    description?: StringNullableFilter<"Process"> | string | null
    isActive?: BoolFilter<"Process"> | boolean
    createdAt?: DateTimeFilter<"Process"> | Date | string
    updatedAt?: DateTimeFilter<"Process"> | Date | string
    skuProcesses?: SkuProcessListRelationFilter
  }, "id" | "processCode">

  export type ProcessOrderByWithAggregationInput = {
    id?: SortOrder
    processCode?: SortOrder
    processName?: SortOrder
    department?: SortOrderInput | SortOrder
    defaultSequence?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProcessCountOrderByAggregateInput
    _avg?: ProcessAvgOrderByAggregateInput
    _max?: ProcessMaxOrderByAggregateInput
    _min?: ProcessMinOrderByAggregateInput
    _sum?: ProcessSumOrderByAggregateInput
  }

  export type ProcessScalarWhereWithAggregatesInput = {
    AND?: ProcessScalarWhereWithAggregatesInput | ProcessScalarWhereWithAggregatesInput[]
    OR?: ProcessScalarWhereWithAggregatesInput[]
    NOT?: ProcessScalarWhereWithAggregatesInput | ProcessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Process"> | string
    processCode?: StringWithAggregatesFilter<"Process"> | string
    processName?: StringWithAggregatesFilter<"Process"> | string
    department?: StringNullableWithAggregatesFilter<"Process"> | string | null
    defaultSequence?: IntWithAggregatesFilter<"Process"> | number
    description?: StringNullableWithAggregatesFilter<"Process"> | string | null
    isActive?: BoolWithAggregatesFilter<"Process"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Process"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Process"> | Date | string
  }

  export type SkuProcessWhereInput = {
    AND?: SkuProcessWhereInput | SkuProcessWhereInput[]
    OR?: SkuProcessWhereInput[]
    NOT?: SkuProcessWhereInput | SkuProcessWhereInput[]
    id?: StringFilter<"SkuProcess"> | string
    skuId?: StringFilter<"SkuProcess"> | string
    processId?: StringFilter<"SkuProcess"> | string
    sequence?: IntFilter<"SkuProcess"> | number
    notes?: StringNullableFilter<"SkuProcess"> | string | null
    createdAt?: DateTimeFilter<"SkuProcess"> | Date | string
    updatedAt?: DateTimeFilter<"SkuProcess"> | Date | string
    sku?: XOR<SkuScalarRelationFilter, SkuWhereInput>
    process?: XOR<ProcessScalarRelationFilter, ProcessWhereInput>
  }

  export type SkuProcessOrderByWithRelationInput = {
    id?: SortOrder
    skuId?: SortOrder
    processId?: SortOrder
    sequence?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sku?: SkuOrderByWithRelationInput
    process?: ProcessOrderByWithRelationInput
  }

  export type SkuProcessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    skuId_processId?: SkuProcessSkuIdProcessIdCompoundUniqueInput
    skuId_sequence?: SkuProcessSkuIdSequenceCompoundUniqueInput
    AND?: SkuProcessWhereInput | SkuProcessWhereInput[]
    OR?: SkuProcessWhereInput[]
    NOT?: SkuProcessWhereInput | SkuProcessWhereInput[]
    skuId?: StringFilter<"SkuProcess"> | string
    processId?: StringFilter<"SkuProcess"> | string
    sequence?: IntFilter<"SkuProcess"> | number
    notes?: StringNullableFilter<"SkuProcess"> | string | null
    createdAt?: DateTimeFilter<"SkuProcess"> | Date | string
    updatedAt?: DateTimeFilter<"SkuProcess"> | Date | string
    sku?: XOR<SkuScalarRelationFilter, SkuWhereInput>
    process?: XOR<ProcessScalarRelationFilter, ProcessWhereInput>
  }, "id" | "skuId_processId" | "skuId_sequence">

  export type SkuProcessOrderByWithAggregationInput = {
    id?: SortOrder
    skuId?: SortOrder
    processId?: SortOrder
    sequence?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SkuProcessCountOrderByAggregateInput
    _avg?: SkuProcessAvgOrderByAggregateInput
    _max?: SkuProcessMaxOrderByAggregateInput
    _min?: SkuProcessMinOrderByAggregateInput
    _sum?: SkuProcessSumOrderByAggregateInput
  }

  export type SkuProcessScalarWhereWithAggregatesInput = {
    AND?: SkuProcessScalarWhereWithAggregatesInput | SkuProcessScalarWhereWithAggregatesInput[]
    OR?: SkuProcessScalarWhereWithAggregatesInput[]
    NOT?: SkuProcessScalarWhereWithAggregatesInput | SkuProcessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SkuProcess"> | string
    skuId?: StringWithAggregatesFilter<"SkuProcess"> | string
    processId?: StringWithAggregatesFilter<"SkuProcess"> | string
    sequence?: IntWithAggregatesFilter<"SkuProcess"> | number
    notes?: StringNullableWithAggregatesFilter<"SkuProcess"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SkuProcess"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SkuProcess"> | Date | string
  }

  export type RejectionWhereInput = {
    AND?: RejectionWhereInput | RejectionWhereInput[]
    OR?: RejectionWhereInput[]
    NOT?: RejectionWhereInput | RejectionWhereInput[]
    id?: StringFilter<"Rejection"> | string
    customerId?: StringFilter<"Rejection"> | string
    skuId?: StringNullableFilter<"Rejection"> | string | null
    productionOrderRef?: StringNullableFilter<"Rejection"> | string | null
    rejectionCount?: IntFilter<"Rejection"> | number
    rejectionReason?: StringFilter<"Rejection"> | string
    rejectionDate?: DateTimeFilter<"Rejection"> | Date | string
    notes?: StringNullableFilter<"Rejection"> | string | null
    createdAt?: DateTimeFilter<"Rejection"> | Date | string
    updatedAt?: DateTimeFilter<"Rejection"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    sku?: XOR<SkuNullableScalarRelationFilter, SkuWhereInput> | null
  }

  export type RejectionOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    skuId?: SortOrderInput | SortOrder
    productionOrderRef?: SortOrderInput | SortOrder
    rejectionCount?: SortOrder
    rejectionReason?: SortOrder
    rejectionDate?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    sku?: SkuOrderByWithRelationInput
  }

  export type RejectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RejectionWhereInput | RejectionWhereInput[]
    OR?: RejectionWhereInput[]
    NOT?: RejectionWhereInput | RejectionWhereInput[]
    customerId?: StringFilter<"Rejection"> | string
    skuId?: StringNullableFilter<"Rejection"> | string | null
    productionOrderRef?: StringNullableFilter<"Rejection"> | string | null
    rejectionCount?: IntFilter<"Rejection"> | number
    rejectionReason?: StringFilter<"Rejection"> | string
    rejectionDate?: DateTimeFilter<"Rejection"> | Date | string
    notes?: StringNullableFilter<"Rejection"> | string | null
    createdAt?: DateTimeFilter<"Rejection"> | Date | string
    updatedAt?: DateTimeFilter<"Rejection"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    sku?: XOR<SkuNullableScalarRelationFilter, SkuWhereInput> | null
  }, "id">

  export type RejectionOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    skuId?: SortOrderInput | SortOrder
    productionOrderRef?: SortOrderInput | SortOrder
    rejectionCount?: SortOrder
    rejectionReason?: SortOrder
    rejectionDate?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RejectionCountOrderByAggregateInput
    _avg?: RejectionAvgOrderByAggregateInput
    _max?: RejectionMaxOrderByAggregateInput
    _min?: RejectionMinOrderByAggregateInput
    _sum?: RejectionSumOrderByAggregateInput
  }

  export type RejectionScalarWhereWithAggregatesInput = {
    AND?: RejectionScalarWhereWithAggregatesInput | RejectionScalarWhereWithAggregatesInput[]
    OR?: RejectionScalarWhereWithAggregatesInput[]
    NOT?: RejectionScalarWhereWithAggregatesInput | RejectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rejection"> | string
    customerId?: StringWithAggregatesFilter<"Rejection"> | string
    skuId?: StringNullableWithAggregatesFilter<"Rejection"> | string | null
    productionOrderRef?: StringNullableWithAggregatesFilter<"Rejection"> | string | null
    rejectionCount?: IntWithAggregatesFilter<"Rejection"> | number
    rejectionReason?: StringWithAggregatesFilter<"Rejection"> | string
    rejectionDate?: DateTimeWithAggregatesFilter<"Rejection"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Rejection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Rejection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Rejection"> | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    customerId: string
    name: string
    notes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: SkuCreateNestedManyWithoutCustomerInput
    rejections?: RejectionCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    customerId: string
    name: string
    notes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: SkuUncheckedCreateNestedManyWithoutCustomerInput
    rejections?: RejectionUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: SkuUpdateManyWithoutCustomerNestedInput
    rejections?: RejectionUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: SkuUncheckedUpdateManyWithoutCustomerNestedInput
    rejections?: RejectionUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    customerId: string
    name: string
    notes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuCreateInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSkusInput
    processes?: SkuProcessCreateNestedManyWithoutSkuInput
    rejections?: RejectionCreateNestedManyWithoutSkuInput
  }

  export type SkuUncheckedCreateInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    customerId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    processes?: SkuProcessUncheckedCreateNestedManyWithoutSkuInput
    rejections?: RejectionUncheckedCreateNestedManyWithoutSkuInput
  }

  export type SkuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSkusNestedInput
    processes?: SkuProcessUpdateManyWithoutSkuNestedInput
    rejections?: RejectionUpdateManyWithoutSkuNestedInput
  }

  export type SkuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processes?: SkuProcessUncheckedUpdateManyWithoutSkuNestedInput
    rejections?: RejectionUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type SkuCreateManyInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    customerId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessCreateInput = {
    id?: string
    processCode: string
    processName: string
    department?: string | null
    defaultSequence?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    skuProcesses?: SkuProcessCreateNestedManyWithoutProcessInput
  }

  export type ProcessUncheckedCreateInput = {
    id?: string
    processCode: string
    processName: string
    department?: string | null
    defaultSequence?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    skuProcesses?: SkuProcessUncheckedCreateNestedManyWithoutProcessInput
  }

  export type ProcessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    processCode?: StringFieldUpdateOperationsInput | string
    processName?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSequence?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skuProcesses?: SkuProcessUpdateManyWithoutProcessNestedInput
  }

  export type ProcessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    processCode?: StringFieldUpdateOperationsInput | string
    processName?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSequence?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skuProcesses?: SkuProcessUncheckedUpdateManyWithoutProcessNestedInput
  }

  export type ProcessCreateManyInput = {
    id?: string
    processCode: string
    processName: string
    department?: string | null
    defaultSequence?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    processCode?: StringFieldUpdateOperationsInput | string
    processName?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSequence?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    processCode?: StringFieldUpdateOperationsInput | string
    processName?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSequence?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuProcessCreateInput = {
    id?: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sku: SkuCreateNestedOneWithoutProcessesInput
    process: ProcessCreateNestedOneWithoutSkuProcessesInput
  }

  export type SkuProcessUncheckedCreateInput = {
    id?: string
    skuId: string
    processId: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuProcessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: SkuUpdateOneRequiredWithoutProcessesNestedInput
    process?: ProcessUpdateOneRequiredWithoutSkuProcessesNestedInput
  }

  export type SkuProcessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    processId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuProcessCreateManyInput = {
    id?: string
    skuId: string
    processId: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuProcessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuProcessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    processId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RejectionCreateInput = {
    id?: string
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutRejectionsInput
    sku?: SkuCreateNestedOneWithoutRejectionsInput
  }

  export type RejectionUncheckedCreateInput = {
    id?: string
    customerId: string
    skuId?: string | null
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RejectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutRejectionsNestedInput
    sku?: SkuUpdateOneWithoutRejectionsNestedInput
  }

  export type RejectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    skuId?: NullableStringFieldUpdateOperationsInput | string | null
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RejectionCreateManyInput = {
    id?: string
    customerId: string
    skuId?: string | null
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RejectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RejectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    skuId?: NullableStringFieldUpdateOperationsInput | string | null
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SkuListRelationFilter = {
    every?: SkuWhereInput
    some?: SkuWhereInput
    none?: SkuWhereInput
  }

  export type RejectionListRelationFilter = {
    every?: RejectionWhereInput
    some?: RejectionWhereInput
    none?: RejectionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SkuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RejectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    name?: SortOrder
    notes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type SkuProcessListRelationFilter = {
    every?: SkuProcessWhereInput
    some?: SkuProcessWhereInput
    none?: SkuProcessWhereInput
  }

  export type SkuProcessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SkuCountOrderByAggregateInput = {
    id?: SortOrder
    skuCode?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    customerId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkuMaxOrderByAggregateInput = {
    id?: SortOrder
    skuCode?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    customerId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkuMinOrderByAggregateInput = {
    id?: SortOrder
    skuCode?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    customerId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProcessCountOrderByAggregateInput = {
    id?: SortOrder
    processCode?: SortOrder
    processName?: SortOrder
    department?: SortOrder
    defaultSequence?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessAvgOrderByAggregateInput = {
    defaultSequence?: SortOrder
  }

  export type ProcessMaxOrderByAggregateInput = {
    id?: SortOrder
    processCode?: SortOrder
    processName?: SortOrder
    department?: SortOrder
    defaultSequence?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessMinOrderByAggregateInput = {
    id?: SortOrder
    processCode?: SortOrder
    processName?: SortOrder
    department?: SortOrder
    defaultSequence?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessSumOrderByAggregateInput = {
    defaultSequence?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SkuScalarRelationFilter = {
    is?: SkuWhereInput
    isNot?: SkuWhereInput
  }

  export type ProcessScalarRelationFilter = {
    is?: ProcessWhereInput
    isNot?: ProcessWhereInput
  }

  export type SkuProcessSkuIdProcessIdCompoundUniqueInput = {
    skuId: string
    processId: string
  }

  export type SkuProcessSkuIdSequenceCompoundUniqueInput = {
    skuId: string
    sequence: number
  }

  export type SkuProcessCountOrderByAggregateInput = {
    id?: SortOrder
    skuId?: SortOrder
    processId?: SortOrder
    sequence?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkuProcessAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type SkuProcessMaxOrderByAggregateInput = {
    id?: SortOrder
    skuId?: SortOrder
    processId?: SortOrder
    sequence?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkuProcessMinOrderByAggregateInput = {
    id?: SortOrder
    skuId?: SortOrder
    processId?: SortOrder
    sequence?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkuProcessSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type SkuNullableScalarRelationFilter = {
    is?: SkuWhereInput | null
    isNot?: SkuWhereInput | null
  }

  export type RejectionCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    skuId?: SortOrder
    productionOrderRef?: SortOrder
    rejectionCount?: SortOrder
    rejectionReason?: SortOrder
    rejectionDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RejectionAvgOrderByAggregateInput = {
    rejectionCount?: SortOrder
  }

  export type RejectionMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    skuId?: SortOrder
    productionOrderRef?: SortOrder
    rejectionCount?: SortOrder
    rejectionReason?: SortOrder
    rejectionDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RejectionMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    skuId?: SortOrder
    productionOrderRef?: SortOrder
    rejectionCount?: SortOrder
    rejectionReason?: SortOrder
    rejectionDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RejectionSumOrderByAggregateInput = {
    rejectionCount?: SortOrder
  }

  export type SkuCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SkuCreateWithoutCustomerInput, SkuUncheckedCreateWithoutCustomerInput> | SkuCreateWithoutCustomerInput[] | SkuUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SkuCreateOrConnectWithoutCustomerInput | SkuCreateOrConnectWithoutCustomerInput[]
    createMany?: SkuCreateManyCustomerInputEnvelope
    connect?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
  }

  export type RejectionCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RejectionCreateWithoutCustomerInput, RejectionUncheckedCreateWithoutCustomerInput> | RejectionCreateWithoutCustomerInput[] | RejectionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutCustomerInput | RejectionCreateOrConnectWithoutCustomerInput[]
    createMany?: RejectionCreateManyCustomerInputEnvelope
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
  }

  export type SkuUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<SkuCreateWithoutCustomerInput, SkuUncheckedCreateWithoutCustomerInput> | SkuCreateWithoutCustomerInput[] | SkuUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SkuCreateOrConnectWithoutCustomerInput | SkuCreateOrConnectWithoutCustomerInput[]
    createMany?: SkuCreateManyCustomerInputEnvelope
    connect?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
  }

  export type RejectionUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RejectionCreateWithoutCustomerInput, RejectionUncheckedCreateWithoutCustomerInput> | RejectionCreateWithoutCustomerInput[] | RejectionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutCustomerInput | RejectionCreateOrConnectWithoutCustomerInput[]
    createMany?: RejectionCreateManyCustomerInputEnvelope
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SkuUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SkuCreateWithoutCustomerInput, SkuUncheckedCreateWithoutCustomerInput> | SkuCreateWithoutCustomerInput[] | SkuUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SkuCreateOrConnectWithoutCustomerInput | SkuCreateOrConnectWithoutCustomerInput[]
    upsert?: SkuUpsertWithWhereUniqueWithoutCustomerInput | SkuUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SkuCreateManyCustomerInputEnvelope
    set?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    disconnect?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    delete?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    connect?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    update?: SkuUpdateWithWhereUniqueWithoutCustomerInput | SkuUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SkuUpdateManyWithWhereWithoutCustomerInput | SkuUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SkuScalarWhereInput | SkuScalarWhereInput[]
  }

  export type RejectionUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RejectionCreateWithoutCustomerInput, RejectionUncheckedCreateWithoutCustomerInput> | RejectionCreateWithoutCustomerInput[] | RejectionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutCustomerInput | RejectionCreateOrConnectWithoutCustomerInput[]
    upsert?: RejectionUpsertWithWhereUniqueWithoutCustomerInput | RejectionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RejectionCreateManyCustomerInputEnvelope
    set?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    disconnect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    delete?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    update?: RejectionUpdateWithWhereUniqueWithoutCustomerInput | RejectionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RejectionUpdateManyWithWhereWithoutCustomerInput | RejectionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RejectionScalarWhereInput | RejectionScalarWhereInput[]
  }

  export type SkuUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<SkuCreateWithoutCustomerInput, SkuUncheckedCreateWithoutCustomerInput> | SkuCreateWithoutCustomerInput[] | SkuUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: SkuCreateOrConnectWithoutCustomerInput | SkuCreateOrConnectWithoutCustomerInput[]
    upsert?: SkuUpsertWithWhereUniqueWithoutCustomerInput | SkuUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: SkuCreateManyCustomerInputEnvelope
    set?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    disconnect?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    delete?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    connect?: SkuWhereUniqueInput | SkuWhereUniqueInput[]
    update?: SkuUpdateWithWhereUniqueWithoutCustomerInput | SkuUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: SkuUpdateManyWithWhereWithoutCustomerInput | SkuUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: SkuScalarWhereInput | SkuScalarWhereInput[]
  }

  export type RejectionUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RejectionCreateWithoutCustomerInput, RejectionUncheckedCreateWithoutCustomerInput> | RejectionCreateWithoutCustomerInput[] | RejectionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutCustomerInput | RejectionCreateOrConnectWithoutCustomerInput[]
    upsert?: RejectionUpsertWithWhereUniqueWithoutCustomerInput | RejectionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RejectionCreateManyCustomerInputEnvelope
    set?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    disconnect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    delete?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    update?: RejectionUpdateWithWhereUniqueWithoutCustomerInput | RejectionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RejectionUpdateManyWithWhereWithoutCustomerInput | RejectionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RejectionScalarWhereInput | RejectionScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutSkusInput = {
    create?: XOR<CustomerCreateWithoutSkusInput, CustomerUncheckedCreateWithoutSkusInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSkusInput
    connect?: CustomerWhereUniqueInput
  }

  export type SkuProcessCreateNestedManyWithoutSkuInput = {
    create?: XOR<SkuProcessCreateWithoutSkuInput, SkuProcessUncheckedCreateWithoutSkuInput> | SkuProcessCreateWithoutSkuInput[] | SkuProcessUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutSkuInput | SkuProcessCreateOrConnectWithoutSkuInput[]
    createMany?: SkuProcessCreateManySkuInputEnvelope
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
  }

  export type RejectionCreateNestedManyWithoutSkuInput = {
    create?: XOR<RejectionCreateWithoutSkuInput, RejectionUncheckedCreateWithoutSkuInput> | RejectionCreateWithoutSkuInput[] | RejectionUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutSkuInput | RejectionCreateOrConnectWithoutSkuInput[]
    createMany?: RejectionCreateManySkuInputEnvelope
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
  }

  export type SkuProcessUncheckedCreateNestedManyWithoutSkuInput = {
    create?: XOR<SkuProcessCreateWithoutSkuInput, SkuProcessUncheckedCreateWithoutSkuInput> | SkuProcessCreateWithoutSkuInput[] | SkuProcessUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutSkuInput | SkuProcessCreateOrConnectWithoutSkuInput[]
    createMany?: SkuProcessCreateManySkuInputEnvelope
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
  }

  export type RejectionUncheckedCreateNestedManyWithoutSkuInput = {
    create?: XOR<RejectionCreateWithoutSkuInput, RejectionUncheckedCreateWithoutSkuInput> | RejectionCreateWithoutSkuInput[] | RejectionUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutSkuInput | RejectionCreateOrConnectWithoutSkuInput[]
    createMany?: RejectionCreateManySkuInputEnvelope
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
  }

  export type CustomerUpdateOneRequiredWithoutSkusNestedInput = {
    create?: XOR<CustomerCreateWithoutSkusInput, CustomerUncheckedCreateWithoutSkusInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutSkusInput
    upsert?: CustomerUpsertWithoutSkusInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutSkusInput, CustomerUpdateWithoutSkusInput>, CustomerUncheckedUpdateWithoutSkusInput>
  }

  export type SkuProcessUpdateManyWithoutSkuNestedInput = {
    create?: XOR<SkuProcessCreateWithoutSkuInput, SkuProcessUncheckedCreateWithoutSkuInput> | SkuProcessCreateWithoutSkuInput[] | SkuProcessUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutSkuInput | SkuProcessCreateOrConnectWithoutSkuInput[]
    upsert?: SkuProcessUpsertWithWhereUniqueWithoutSkuInput | SkuProcessUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: SkuProcessCreateManySkuInputEnvelope
    set?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    disconnect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    delete?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    update?: SkuProcessUpdateWithWhereUniqueWithoutSkuInput | SkuProcessUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: SkuProcessUpdateManyWithWhereWithoutSkuInput | SkuProcessUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: SkuProcessScalarWhereInput | SkuProcessScalarWhereInput[]
  }

  export type RejectionUpdateManyWithoutSkuNestedInput = {
    create?: XOR<RejectionCreateWithoutSkuInput, RejectionUncheckedCreateWithoutSkuInput> | RejectionCreateWithoutSkuInput[] | RejectionUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutSkuInput | RejectionCreateOrConnectWithoutSkuInput[]
    upsert?: RejectionUpsertWithWhereUniqueWithoutSkuInput | RejectionUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: RejectionCreateManySkuInputEnvelope
    set?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    disconnect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    delete?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    update?: RejectionUpdateWithWhereUniqueWithoutSkuInput | RejectionUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: RejectionUpdateManyWithWhereWithoutSkuInput | RejectionUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: RejectionScalarWhereInput | RejectionScalarWhereInput[]
  }

  export type SkuProcessUncheckedUpdateManyWithoutSkuNestedInput = {
    create?: XOR<SkuProcessCreateWithoutSkuInput, SkuProcessUncheckedCreateWithoutSkuInput> | SkuProcessCreateWithoutSkuInput[] | SkuProcessUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutSkuInput | SkuProcessCreateOrConnectWithoutSkuInput[]
    upsert?: SkuProcessUpsertWithWhereUniqueWithoutSkuInput | SkuProcessUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: SkuProcessCreateManySkuInputEnvelope
    set?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    disconnect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    delete?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    update?: SkuProcessUpdateWithWhereUniqueWithoutSkuInput | SkuProcessUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: SkuProcessUpdateManyWithWhereWithoutSkuInput | SkuProcessUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: SkuProcessScalarWhereInput | SkuProcessScalarWhereInput[]
  }

  export type RejectionUncheckedUpdateManyWithoutSkuNestedInput = {
    create?: XOR<RejectionCreateWithoutSkuInput, RejectionUncheckedCreateWithoutSkuInput> | RejectionCreateWithoutSkuInput[] | RejectionUncheckedCreateWithoutSkuInput[]
    connectOrCreate?: RejectionCreateOrConnectWithoutSkuInput | RejectionCreateOrConnectWithoutSkuInput[]
    upsert?: RejectionUpsertWithWhereUniqueWithoutSkuInput | RejectionUpsertWithWhereUniqueWithoutSkuInput[]
    createMany?: RejectionCreateManySkuInputEnvelope
    set?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    disconnect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    delete?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    connect?: RejectionWhereUniqueInput | RejectionWhereUniqueInput[]
    update?: RejectionUpdateWithWhereUniqueWithoutSkuInput | RejectionUpdateWithWhereUniqueWithoutSkuInput[]
    updateMany?: RejectionUpdateManyWithWhereWithoutSkuInput | RejectionUpdateManyWithWhereWithoutSkuInput[]
    deleteMany?: RejectionScalarWhereInput | RejectionScalarWhereInput[]
  }

  export type SkuProcessCreateNestedManyWithoutProcessInput = {
    create?: XOR<SkuProcessCreateWithoutProcessInput, SkuProcessUncheckedCreateWithoutProcessInput> | SkuProcessCreateWithoutProcessInput[] | SkuProcessUncheckedCreateWithoutProcessInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutProcessInput | SkuProcessCreateOrConnectWithoutProcessInput[]
    createMany?: SkuProcessCreateManyProcessInputEnvelope
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
  }

  export type SkuProcessUncheckedCreateNestedManyWithoutProcessInput = {
    create?: XOR<SkuProcessCreateWithoutProcessInput, SkuProcessUncheckedCreateWithoutProcessInput> | SkuProcessCreateWithoutProcessInput[] | SkuProcessUncheckedCreateWithoutProcessInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutProcessInput | SkuProcessCreateOrConnectWithoutProcessInput[]
    createMany?: SkuProcessCreateManyProcessInputEnvelope
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SkuProcessUpdateManyWithoutProcessNestedInput = {
    create?: XOR<SkuProcessCreateWithoutProcessInput, SkuProcessUncheckedCreateWithoutProcessInput> | SkuProcessCreateWithoutProcessInput[] | SkuProcessUncheckedCreateWithoutProcessInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutProcessInput | SkuProcessCreateOrConnectWithoutProcessInput[]
    upsert?: SkuProcessUpsertWithWhereUniqueWithoutProcessInput | SkuProcessUpsertWithWhereUniqueWithoutProcessInput[]
    createMany?: SkuProcessCreateManyProcessInputEnvelope
    set?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    disconnect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    delete?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    update?: SkuProcessUpdateWithWhereUniqueWithoutProcessInput | SkuProcessUpdateWithWhereUniqueWithoutProcessInput[]
    updateMany?: SkuProcessUpdateManyWithWhereWithoutProcessInput | SkuProcessUpdateManyWithWhereWithoutProcessInput[]
    deleteMany?: SkuProcessScalarWhereInput | SkuProcessScalarWhereInput[]
  }

  export type SkuProcessUncheckedUpdateManyWithoutProcessNestedInput = {
    create?: XOR<SkuProcessCreateWithoutProcessInput, SkuProcessUncheckedCreateWithoutProcessInput> | SkuProcessCreateWithoutProcessInput[] | SkuProcessUncheckedCreateWithoutProcessInput[]
    connectOrCreate?: SkuProcessCreateOrConnectWithoutProcessInput | SkuProcessCreateOrConnectWithoutProcessInput[]
    upsert?: SkuProcessUpsertWithWhereUniqueWithoutProcessInput | SkuProcessUpsertWithWhereUniqueWithoutProcessInput[]
    createMany?: SkuProcessCreateManyProcessInputEnvelope
    set?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    disconnect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    delete?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    connect?: SkuProcessWhereUniqueInput | SkuProcessWhereUniqueInput[]
    update?: SkuProcessUpdateWithWhereUniqueWithoutProcessInput | SkuProcessUpdateWithWhereUniqueWithoutProcessInput[]
    updateMany?: SkuProcessUpdateManyWithWhereWithoutProcessInput | SkuProcessUpdateManyWithWhereWithoutProcessInput[]
    deleteMany?: SkuProcessScalarWhereInput | SkuProcessScalarWhereInput[]
  }

  export type SkuCreateNestedOneWithoutProcessesInput = {
    create?: XOR<SkuCreateWithoutProcessesInput, SkuUncheckedCreateWithoutProcessesInput>
    connectOrCreate?: SkuCreateOrConnectWithoutProcessesInput
    connect?: SkuWhereUniqueInput
  }

  export type ProcessCreateNestedOneWithoutSkuProcessesInput = {
    create?: XOR<ProcessCreateWithoutSkuProcessesInput, ProcessUncheckedCreateWithoutSkuProcessesInput>
    connectOrCreate?: ProcessCreateOrConnectWithoutSkuProcessesInput
    connect?: ProcessWhereUniqueInput
  }

  export type SkuUpdateOneRequiredWithoutProcessesNestedInput = {
    create?: XOR<SkuCreateWithoutProcessesInput, SkuUncheckedCreateWithoutProcessesInput>
    connectOrCreate?: SkuCreateOrConnectWithoutProcessesInput
    upsert?: SkuUpsertWithoutProcessesInput
    connect?: SkuWhereUniqueInput
    update?: XOR<XOR<SkuUpdateToOneWithWhereWithoutProcessesInput, SkuUpdateWithoutProcessesInput>, SkuUncheckedUpdateWithoutProcessesInput>
  }

  export type ProcessUpdateOneRequiredWithoutSkuProcessesNestedInput = {
    create?: XOR<ProcessCreateWithoutSkuProcessesInput, ProcessUncheckedCreateWithoutSkuProcessesInput>
    connectOrCreate?: ProcessCreateOrConnectWithoutSkuProcessesInput
    upsert?: ProcessUpsertWithoutSkuProcessesInput
    connect?: ProcessWhereUniqueInput
    update?: XOR<XOR<ProcessUpdateToOneWithWhereWithoutSkuProcessesInput, ProcessUpdateWithoutSkuProcessesInput>, ProcessUncheckedUpdateWithoutSkuProcessesInput>
  }

  export type CustomerCreateNestedOneWithoutRejectionsInput = {
    create?: XOR<CustomerCreateWithoutRejectionsInput, CustomerUncheckedCreateWithoutRejectionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRejectionsInput
    connect?: CustomerWhereUniqueInput
  }

  export type SkuCreateNestedOneWithoutRejectionsInput = {
    create?: XOR<SkuCreateWithoutRejectionsInput, SkuUncheckedCreateWithoutRejectionsInput>
    connectOrCreate?: SkuCreateOrConnectWithoutRejectionsInput
    connect?: SkuWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutRejectionsNestedInput = {
    create?: XOR<CustomerCreateWithoutRejectionsInput, CustomerUncheckedCreateWithoutRejectionsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRejectionsInput
    upsert?: CustomerUpsertWithoutRejectionsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutRejectionsInput, CustomerUpdateWithoutRejectionsInput>, CustomerUncheckedUpdateWithoutRejectionsInput>
  }

  export type SkuUpdateOneWithoutRejectionsNestedInput = {
    create?: XOR<SkuCreateWithoutRejectionsInput, SkuUncheckedCreateWithoutRejectionsInput>
    connectOrCreate?: SkuCreateOrConnectWithoutRejectionsInput
    upsert?: SkuUpsertWithoutRejectionsInput
    disconnect?: SkuWhereInput | boolean
    delete?: SkuWhereInput | boolean
    connect?: SkuWhereUniqueInput
    update?: XOR<XOR<SkuUpdateToOneWithWhereWithoutRejectionsInput, SkuUpdateWithoutRejectionsInput>, SkuUncheckedUpdateWithoutRejectionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SkuCreateWithoutCustomerInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    processes?: SkuProcessCreateNestedManyWithoutSkuInput
    rejections?: RejectionCreateNestedManyWithoutSkuInput
  }

  export type SkuUncheckedCreateWithoutCustomerInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    processes?: SkuProcessUncheckedCreateNestedManyWithoutSkuInput
    rejections?: RejectionUncheckedCreateNestedManyWithoutSkuInput
  }

  export type SkuCreateOrConnectWithoutCustomerInput = {
    where: SkuWhereUniqueInput
    create: XOR<SkuCreateWithoutCustomerInput, SkuUncheckedCreateWithoutCustomerInput>
  }

  export type SkuCreateManyCustomerInputEnvelope = {
    data: SkuCreateManyCustomerInput | SkuCreateManyCustomerInput[]
  }

  export type RejectionCreateWithoutCustomerInput = {
    id?: string
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sku?: SkuCreateNestedOneWithoutRejectionsInput
  }

  export type RejectionUncheckedCreateWithoutCustomerInput = {
    id?: string
    skuId?: string | null
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RejectionCreateOrConnectWithoutCustomerInput = {
    where: RejectionWhereUniqueInput
    create: XOR<RejectionCreateWithoutCustomerInput, RejectionUncheckedCreateWithoutCustomerInput>
  }

  export type RejectionCreateManyCustomerInputEnvelope = {
    data: RejectionCreateManyCustomerInput | RejectionCreateManyCustomerInput[]
  }

  export type SkuUpsertWithWhereUniqueWithoutCustomerInput = {
    where: SkuWhereUniqueInput
    update: XOR<SkuUpdateWithoutCustomerInput, SkuUncheckedUpdateWithoutCustomerInput>
    create: XOR<SkuCreateWithoutCustomerInput, SkuUncheckedCreateWithoutCustomerInput>
  }

  export type SkuUpdateWithWhereUniqueWithoutCustomerInput = {
    where: SkuWhereUniqueInput
    data: XOR<SkuUpdateWithoutCustomerInput, SkuUncheckedUpdateWithoutCustomerInput>
  }

  export type SkuUpdateManyWithWhereWithoutCustomerInput = {
    where: SkuScalarWhereInput
    data: XOR<SkuUpdateManyMutationInput, SkuUncheckedUpdateManyWithoutCustomerInput>
  }

  export type SkuScalarWhereInput = {
    AND?: SkuScalarWhereInput | SkuScalarWhereInput[]
    OR?: SkuScalarWhereInput[]
    NOT?: SkuScalarWhereInput | SkuScalarWhereInput[]
    id?: StringFilter<"Sku"> | string
    skuCode?: StringFilter<"Sku"> | string
    name?: StringFilter<"Sku"> | string
    category?: StringNullableFilter<"Sku"> | string | null
    description?: StringNullableFilter<"Sku"> | string | null
    customerId?: StringFilter<"Sku"> | string
    isActive?: BoolFilter<"Sku"> | boolean
    createdAt?: DateTimeFilter<"Sku"> | Date | string
    updatedAt?: DateTimeFilter<"Sku"> | Date | string
  }

  export type RejectionUpsertWithWhereUniqueWithoutCustomerInput = {
    where: RejectionWhereUniqueInput
    update: XOR<RejectionUpdateWithoutCustomerInput, RejectionUncheckedUpdateWithoutCustomerInput>
    create: XOR<RejectionCreateWithoutCustomerInput, RejectionUncheckedCreateWithoutCustomerInput>
  }

  export type RejectionUpdateWithWhereUniqueWithoutCustomerInput = {
    where: RejectionWhereUniqueInput
    data: XOR<RejectionUpdateWithoutCustomerInput, RejectionUncheckedUpdateWithoutCustomerInput>
  }

  export type RejectionUpdateManyWithWhereWithoutCustomerInput = {
    where: RejectionScalarWhereInput
    data: XOR<RejectionUpdateManyMutationInput, RejectionUncheckedUpdateManyWithoutCustomerInput>
  }

  export type RejectionScalarWhereInput = {
    AND?: RejectionScalarWhereInput | RejectionScalarWhereInput[]
    OR?: RejectionScalarWhereInput[]
    NOT?: RejectionScalarWhereInput | RejectionScalarWhereInput[]
    id?: StringFilter<"Rejection"> | string
    customerId?: StringFilter<"Rejection"> | string
    skuId?: StringNullableFilter<"Rejection"> | string | null
    productionOrderRef?: StringNullableFilter<"Rejection"> | string | null
    rejectionCount?: IntFilter<"Rejection"> | number
    rejectionReason?: StringFilter<"Rejection"> | string
    rejectionDate?: DateTimeFilter<"Rejection"> | Date | string
    notes?: StringNullableFilter<"Rejection"> | string | null
    createdAt?: DateTimeFilter<"Rejection"> | Date | string
    updatedAt?: DateTimeFilter<"Rejection"> | Date | string
  }

  export type CustomerCreateWithoutSkusInput = {
    id?: string
    customerId: string
    name: string
    notes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rejections?: RejectionCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutSkusInput = {
    id?: string
    customerId: string
    name: string
    notes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rejections?: RejectionUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutSkusInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutSkusInput, CustomerUncheckedCreateWithoutSkusInput>
  }

  export type SkuProcessCreateWithoutSkuInput = {
    id?: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    process: ProcessCreateNestedOneWithoutSkuProcessesInput
  }

  export type SkuProcessUncheckedCreateWithoutSkuInput = {
    id?: string
    processId: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuProcessCreateOrConnectWithoutSkuInput = {
    where: SkuProcessWhereUniqueInput
    create: XOR<SkuProcessCreateWithoutSkuInput, SkuProcessUncheckedCreateWithoutSkuInput>
  }

  export type SkuProcessCreateManySkuInputEnvelope = {
    data: SkuProcessCreateManySkuInput | SkuProcessCreateManySkuInput[]
  }

  export type RejectionCreateWithoutSkuInput = {
    id?: string
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutRejectionsInput
  }

  export type RejectionUncheckedCreateWithoutSkuInput = {
    id?: string
    customerId: string
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RejectionCreateOrConnectWithoutSkuInput = {
    where: RejectionWhereUniqueInput
    create: XOR<RejectionCreateWithoutSkuInput, RejectionUncheckedCreateWithoutSkuInput>
  }

  export type RejectionCreateManySkuInputEnvelope = {
    data: RejectionCreateManySkuInput | RejectionCreateManySkuInput[]
  }

  export type CustomerUpsertWithoutSkusInput = {
    update: XOR<CustomerUpdateWithoutSkusInput, CustomerUncheckedUpdateWithoutSkusInput>
    create: XOR<CustomerCreateWithoutSkusInput, CustomerUncheckedCreateWithoutSkusInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutSkusInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutSkusInput, CustomerUncheckedUpdateWithoutSkusInput>
  }

  export type CustomerUpdateWithoutSkusInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rejections?: RejectionUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutSkusInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rejections?: RejectionUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type SkuProcessUpsertWithWhereUniqueWithoutSkuInput = {
    where: SkuProcessWhereUniqueInput
    update: XOR<SkuProcessUpdateWithoutSkuInput, SkuProcessUncheckedUpdateWithoutSkuInput>
    create: XOR<SkuProcessCreateWithoutSkuInput, SkuProcessUncheckedCreateWithoutSkuInput>
  }

  export type SkuProcessUpdateWithWhereUniqueWithoutSkuInput = {
    where: SkuProcessWhereUniqueInput
    data: XOR<SkuProcessUpdateWithoutSkuInput, SkuProcessUncheckedUpdateWithoutSkuInput>
  }

  export type SkuProcessUpdateManyWithWhereWithoutSkuInput = {
    where: SkuProcessScalarWhereInput
    data: XOR<SkuProcessUpdateManyMutationInput, SkuProcessUncheckedUpdateManyWithoutSkuInput>
  }

  export type SkuProcessScalarWhereInput = {
    AND?: SkuProcessScalarWhereInput | SkuProcessScalarWhereInput[]
    OR?: SkuProcessScalarWhereInput[]
    NOT?: SkuProcessScalarWhereInput | SkuProcessScalarWhereInput[]
    id?: StringFilter<"SkuProcess"> | string
    skuId?: StringFilter<"SkuProcess"> | string
    processId?: StringFilter<"SkuProcess"> | string
    sequence?: IntFilter<"SkuProcess"> | number
    notes?: StringNullableFilter<"SkuProcess"> | string | null
    createdAt?: DateTimeFilter<"SkuProcess"> | Date | string
    updatedAt?: DateTimeFilter<"SkuProcess"> | Date | string
  }

  export type RejectionUpsertWithWhereUniqueWithoutSkuInput = {
    where: RejectionWhereUniqueInput
    update: XOR<RejectionUpdateWithoutSkuInput, RejectionUncheckedUpdateWithoutSkuInput>
    create: XOR<RejectionCreateWithoutSkuInput, RejectionUncheckedCreateWithoutSkuInput>
  }

  export type RejectionUpdateWithWhereUniqueWithoutSkuInput = {
    where: RejectionWhereUniqueInput
    data: XOR<RejectionUpdateWithoutSkuInput, RejectionUncheckedUpdateWithoutSkuInput>
  }

  export type RejectionUpdateManyWithWhereWithoutSkuInput = {
    where: RejectionScalarWhereInput
    data: XOR<RejectionUpdateManyMutationInput, RejectionUncheckedUpdateManyWithoutSkuInput>
  }

  export type SkuProcessCreateWithoutProcessInput = {
    id?: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sku: SkuCreateNestedOneWithoutProcessesInput
  }

  export type SkuProcessUncheckedCreateWithoutProcessInput = {
    id?: string
    skuId: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuProcessCreateOrConnectWithoutProcessInput = {
    where: SkuProcessWhereUniqueInput
    create: XOR<SkuProcessCreateWithoutProcessInput, SkuProcessUncheckedCreateWithoutProcessInput>
  }

  export type SkuProcessCreateManyProcessInputEnvelope = {
    data: SkuProcessCreateManyProcessInput | SkuProcessCreateManyProcessInput[]
  }

  export type SkuProcessUpsertWithWhereUniqueWithoutProcessInput = {
    where: SkuProcessWhereUniqueInput
    update: XOR<SkuProcessUpdateWithoutProcessInput, SkuProcessUncheckedUpdateWithoutProcessInput>
    create: XOR<SkuProcessCreateWithoutProcessInput, SkuProcessUncheckedCreateWithoutProcessInput>
  }

  export type SkuProcessUpdateWithWhereUniqueWithoutProcessInput = {
    where: SkuProcessWhereUniqueInput
    data: XOR<SkuProcessUpdateWithoutProcessInput, SkuProcessUncheckedUpdateWithoutProcessInput>
  }

  export type SkuProcessUpdateManyWithWhereWithoutProcessInput = {
    where: SkuProcessScalarWhereInput
    data: XOR<SkuProcessUpdateManyMutationInput, SkuProcessUncheckedUpdateManyWithoutProcessInput>
  }

  export type SkuCreateWithoutProcessesInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSkusInput
    rejections?: RejectionCreateNestedManyWithoutSkuInput
  }

  export type SkuUncheckedCreateWithoutProcessesInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    customerId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rejections?: RejectionUncheckedCreateNestedManyWithoutSkuInput
  }

  export type SkuCreateOrConnectWithoutProcessesInput = {
    where: SkuWhereUniqueInput
    create: XOR<SkuCreateWithoutProcessesInput, SkuUncheckedCreateWithoutProcessesInput>
  }

  export type ProcessCreateWithoutSkuProcessesInput = {
    id?: string
    processCode: string
    processName: string
    department?: string | null
    defaultSequence?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessUncheckedCreateWithoutSkuProcessesInput = {
    id?: string
    processCode: string
    processName: string
    department?: string | null
    defaultSequence?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessCreateOrConnectWithoutSkuProcessesInput = {
    where: ProcessWhereUniqueInput
    create: XOR<ProcessCreateWithoutSkuProcessesInput, ProcessUncheckedCreateWithoutSkuProcessesInput>
  }

  export type SkuUpsertWithoutProcessesInput = {
    update: XOR<SkuUpdateWithoutProcessesInput, SkuUncheckedUpdateWithoutProcessesInput>
    create: XOR<SkuCreateWithoutProcessesInput, SkuUncheckedCreateWithoutProcessesInput>
    where?: SkuWhereInput
  }

  export type SkuUpdateToOneWithWhereWithoutProcessesInput = {
    where?: SkuWhereInput
    data: XOR<SkuUpdateWithoutProcessesInput, SkuUncheckedUpdateWithoutProcessesInput>
  }

  export type SkuUpdateWithoutProcessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSkusNestedInput
    rejections?: RejectionUpdateManyWithoutSkuNestedInput
  }

  export type SkuUncheckedUpdateWithoutProcessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rejections?: RejectionUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type ProcessUpsertWithoutSkuProcessesInput = {
    update: XOR<ProcessUpdateWithoutSkuProcessesInput, ProcessUncheckedUpdateWithoutSkuProcessesInput>
    create: XOR<ProcessCreateWithoutSkuProcessesInput, ProcessUncheckedCreateWithoutSkuProcessesInput>
    where?: ProcessWhereInput
  }

  export type ProcessUpdateToOneWithWhereWithoutSkuProcessesInput = {
    where?: ProcessWhereInput
    data: XOR<ProcessUpdateWithoutSkuProcessesInput, ProcessUncheckedUpdateWithoutSkuProcessesInput>
  }

  export type ProcessUpdateWithoutSkuProcessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    processCode?: StringFieldUpdateOperationsInput | string
    processName?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSequence?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessUncheckedUpdateWithoutSkuProcessesInput = {
    id?: StringFieldUpdateOperationsInput | string
    processCode?: StringFieldUpdateOperationsInput | string
    processName?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    defaultSequence?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateWithoutRejectionsInput = {
    id?: string
    customerId: string
    name: string
    notes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: SkuCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutRejectionsInput = {
    id?: string
    customerId: string
    name: string
    notes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    skus?: SkuUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutRejectionsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutRejectionsInput, CustomerUncheckedCreateWithoutRejectionsInput>
  }

  export type SkuCreateWithoutRejectionsInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutSkusInput
    processes?: SkuProcessCreateNestedManyWithoutSkuInput
  }

  export type SkuUncheckedCreateWithoutRejectionsInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    customerId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    processes?: SkuProcessUncheckedCreateNestedManyWithoutSkuInput
  }

  export type SkuCreateOrConnectWithoutRejectionsInput = {
    where: SkuWhereUniqueInput
    create: XOR<SkuCreateWithoutRejectionsInput, SkuUncheckedCreateWithoutRejectionsInput>
  }

  export type CustomerUpsertWithoutRejectionsInput = {
    update: XOR<CustomerUpdateWithoutRejectionsInput, CustomerUncheckedUpdateWithoutRejectionsInput>
    create: XOR<CustomerCreateWithoutRejectionsInput, CustomerUncheckedCreateWithoutRejectionsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutRejectionsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutRejectionsInput, CustomerUncheckedUpdateWithoutRejectionsInput>
  }

  export type CustomerUpdateWithoutRejectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: SkuUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutRejectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skus?: SkuUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type SkuUpsertWithoutRejectionsInput = {
    update: XOR<SkuUpdateWithoutRejectionsInput, SkuUncheckedUpdateWithoutRejectionsInput>
    create: XOR<SkuCreateWithoutRejectionsInput, SkuUncheckedCreateWithoutRejectionsInput>
    where?: SkuWhereInput
  }

  export type SkuUpdateToOneWithWhereWithoutRejectionsInput = {
    where?: SkuWhereInput
    data: XOR<SkuUpdateWithoutRejectionsInput, SkuUncheckedUpdateWithoutRejectionsInput>
  }

  export type SkuUpdateWithoutRejectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutSkusNestedInput
    processes?: SkuProcessUpdateManyWithoutSkuNestedInput
  }

  export type SkuUncheckedUpdateWithoutRejectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processes?: SkuProcessUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type SkuCreateManyCustomerInput = {
    id?: string
    skuCode: string
    name: string
    category?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RejectionCreateManyCustomerInput = {
    id?: string
    skuId?: string | null
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processes?: SkuProcessUpdateManyWithoutSkuNestedInput
    rejections?: RejectionUpdateManyWithoutSkuNestedInput
  }

  export type SkuUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processes?: SkuProcessUncheckedUpdateManyWithoutSkuNestedInput
    rejections?: RejectionUncheckedUpdateManyWithoutSkuNestedInput
  }

  export type SkuUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RejectionUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: SkuUpdateOneWithoutRejectionsNestedInput
  }

  export type RejectionUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: NullableStringFieldUpdateOperationsInput | string | null
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RejectionUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: NullableStringFieldUpdateOperationsInput | string | null
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuProcessCreateManySkuInput = {
    id?: string
    processId: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RejectionCreateManySkuInput = {
    id?: string
    customerId: string
    productionOrderRef?: string | null
    rejectionCount: number
    rejectionReason: string
    rejectionDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuProcessUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    process?: ProcessUpdateOneRequiredWithoutSkuProcessesNestedInput
  }

  export type SkuProcessUncheckedUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    processId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuProcessUncheckedUpdateManyWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    processId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RejectionUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutRejectionsNestedInput
  }

  export type RejectionUncheckedUpdateWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RejectionUncheckedUpdateManyWithoutSkuInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productionOrderRef?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionCount?: IntFieldUpdateOperationsInput | number
    rejectionReason?: StringFieldUpdateOperationsInput | string
    rejectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuProcessCreateManyProcessInput = {
    id?: string
    skuId: string
    sequence: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkuProcessUpdateWithoutProcessInput = {
    id?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: SkuUpdateOneRequiredWithoutProcessesNestedInput
  }

  export type SkuProcessUncheckedUpdateWithoutProcessInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkuProcessUncheckedUpdateManyWithoutProcessInput = {
    id?: StringFieldUpdateOperationsInput | string
    skuId?: StringFieldUpdateOperationsInput | string
    sequence?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}