import { Store, StoreValue } from 'nanostores'
import { Ref } from 'vue'

type UnwarpKeys<Keys> = Keys extends (infer Key)[] ? Key : Keys

interface UseVModelOptions {
  prefix: string
}

/**
 * Creates a writable state for use in `v-model`.
 *
 * ```vue
 * <template>
 *   <input v-model="username"/>
 * </template>
 *
 * <script>
 *   import { useVModel } from '@nanostores/vue'
 *
 *   import { profile } from '../stores/profile.js'
 *
 *   export default {
 *     setup () {
 *       const username = useVModel(profile, 'username')
 *       return { username }
 *     }
 *   }
 * </script>
 * ```
 *
 * @param store Store instance.
 * @param key Store’s key or array of keys.
 * @param opts Options for changing the prefix.
 * @returns Writable store value.
 */
export function useVModel<
  SomeStore extends Store,
  Value extends StoreValue<SomeStore>,
  Keys extends keyof Value | (keyof Value)[] = undefined
>(
  store: SomeStore,
  keys?: Keys,
  opts?: UseVModelOptions
): Keys extends undefined
  ? Ref<Value>
  : Keys extends (keyof Value)[]
  ? {
      [Key in UnwarpKeys<Keys>]: Ref<Value[Key]>
    }
  : Ref<Value[Keys]>
