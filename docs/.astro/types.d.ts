declare module "astro:content" {
  interface Render {
    ".mdx": Promise<{
      Content: import("astro").MarkdownInstance<{}>["Content"];
      headings: import("astro").MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module "astro:content" {
  interface Render {
    ".md": Promise<{
      Content: import("astro").MarkdownInstance<{}>["Content"];
      headings: import("astro").MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module "astro:content" {
  export { z } from "astro/zod";

  type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

  export type CollectionKey = keyof AnyEntryMap;
  export type CollectionEntry<C extends CollectionKey> = Flatten<
    AnyEntryMap[C]
  >;

  export type ContentCollectionKey = keyof ContentEntryMap;
  export type DataCollectionKey = keyof DataEntryMap;

  // This needs to be in sync with ImageMetadata
  export type ImageFunction = () => import("astro/zod").ZodObject<{
    src: import("astro/zod").ZodString;
    width: import("astro/zod").ZodNumber;
    height: import("astro/zod").ZodNumber;
    format: import("astro/zod").ZodUnion<
      [
        import("astro/zod").ZodLiteral<"png">,
        import("astro/zod").ZodLiteral<"jpg">,
        import("astro/zod").ZodLiteral<"jpeg">,
        import("astro/zod").ZodLiteral<"tiff">,
        import("astro/zod").ZodLiteral<"webp">,
        import("astro/zod").ZodLiteral<"gif">,
        import("astro/zod").ZodLiteral<"svg">,
        import("astro/zod").ZodLiteral<"avif">,
      ]
    >;
  }>;

  type BaseSchemaWithoutEffects =
    | import("astro/zod").AnyZodObject
    | import("astro/zod").ZodUnion<
        [BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]
      >
    | import("astro/zod").ZodDiscriminatedUnion<
        string,
        import("astro/zod").AnyZodObject[]
      >
    | import("astro/zod").ZodIntersection<
        BaseSchemaWithoutEffects,
        BaseSchemaWithoutEffects
      >;

  type BaseSchema =
    | BaseSchemaWithoutEffects
    | import("astro/zod").ZodEffects<BaseSchemaWithoutEffects>;

  export type SchemaContext = { image: ImageFunction };

  type DataCollectionConfig<S extends BaseSchema> = {
    type: "data";
    schema?: S | ((context: SchemaContext) => S);
  };

  type ContentCollectionConfig<S extends BaseSchema> = {
    type?: "content";
    schema?: S | ((context: SchemaContext) => S);
  };

  type CollectionConfig<S> =
    | ContentCollectionConfig<S>
    | DataCollectionConfig<S>;

  export function defineCollection<S extends BaseSchema>(
    input: CollectionConfig<S>,
  ): CollectionConfig<S>;

  type AllValuesOf<T> = T extends any ? T[keyof T] : never;
  type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
    ContentEntryMap[C]
  >["slug"];

  export function getEntryBySlug<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {}),
  >(
    collection: C,
    // Note that this has to accept a regular string too, for SSR
    entrySlug: E,
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;

  export function getDataEntryById<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C],
  >(collection: C, entryId: E): Promise<CollectionEntry<C>>;

  export function getCollection<
    C extends keyof AnyEntryMap,
    E extends CollectionEntry<C>,
  >(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => entry is E,
  ): Promise<E[]>;
  export function getCollection<C extends keyof AnyEntryMap>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => unknown,
  ): Promise<CollectionEntry<C>[]>;

  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {}),
  >(entry: {
    collection: C;
    slug: E;
  }): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {}),
  >(entry: {
    collection: C;
    id: E;
  }): E extends keyof DataEntryMap[C]
    ? Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {}),
  >(
    collection: C,
    slug: E,
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {}),
  >(
    collection: C,
    id: E,
  ): E extends keyof DataEntryMap[C]
    ? Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;

  /** Resolve an array of entry references from the same collection */
  export function getEntries<C extends keyof ContentEntryMap>(
    entries: {
      collection: C;
      slug: ValidContentEntrySlug<C>;
    }[],
  ): Promise<CollectionEntry<C>[]>;
  export function getEntries<C extends keyof DataEntryMap>(
    entries: {
      collection: C;
      id: keyof DataEntryMap[C];
    }[],
  ): Promise<CollectionEntry<C>[]>;

  export function reference<C extends keyof AnyEntryMap>(
    collection: C,
  ): import("astro/zod").ZodEffects<
    import("astro/zod").ZodString,
    C extends keyof ContentEntryMap
      ? {
          collection: C;
          slug: ValidContentEntrySlug<C>;
        }
      : {
          collection: C;
          id: keyof DataEntryMap[C];
        }
  >;
  // Allow generic `string` to avoid excessive type errors in the config
  // if `dev` is not running to update as you edit.
  // Invalid collection names will be caught at build time.
  export function reference<C extends string>(
    collection: C,
  ): import("astro/zod").ZodEffects<import("astro/zod").ZodString, never>;

  type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
  type InferEntrySchema<C extends keyof AnyEntryMap> =
    import("astro/zod").infer<
      ReturnTypeOrOriginal<Required<ContentConfig["collections"][C]>["schema"]>
    >;

  type ContentEntryMap = {
    docs: {
      "en/folder-structure.mdx": {
        id: "en/folder-structure.mdx";
        slug: "en/folder-structure";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".mdx"] };
      "en/installation.md": {
        id: "en/installation.md";
        slug: "en/installation";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/introduction.mdx": {
        id: "en/introduction.mdx";
        slug: "en/introduction";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".mdx"] };
      "en/usage/expo-router.md": {
        id: "en/usage/expo-router.md";
        slug: "en/usage/expo-router";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/usage/firebase.md": {
        id: "en/usage/firebase.md";
        slug: "en/usage/firebase";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/usage/first-steps.md": {
        id: "en/usage/first-steps.md";
        slug: "en/usage/first-steps";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/usage/nativewind.md": {
        id: "en/usage/nativewind.md";
        slug: "en/usage/nativewind";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/usage/react-navigation.md": {
        id: "en/usage/react-navigation.md";
        slug: "en/usage/react-navigation";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/usage/restyle.md": {
        id: "en/usage/restyle.md";
        slug: "en/usage/restyle";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/usage/supabase.md": {
        id: "en/usage/supabase.md";
        slug: "en/usage/supabase";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
      "en/usage/tamagui.md": {
        id: "en/usage/tamagui.md";
        slug: "en/usage/tamagui";
        body: string;
        collection: "docs";
        data: InferEntrySchema<"docs">;
      } & { render(): Render[".md"] };
    };
  };

  type DataEntryMap = {};

  type AnyEntryMap = ContentEntryMap & DataEntryMap;

  type ContentConfig = typeof import("../src/content/config");
}
