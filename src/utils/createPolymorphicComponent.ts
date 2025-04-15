import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  forwardRef,
} from "react";

type PolymorphicComponentProps<Props, Tag extends ElementType> = {
  as?: Tag;
} & Omit<ComponentPropsWithoutRef<Tag>, keyof Props | "as">;

type PolymorphicComponent<Props, DefaultTag extends ElementType> = <
  Tag extends ElementType = DefaultTag
>(
  props: Props &
    PolymorphicComponentProps<Props, Tag> & {
      ref?: ComponentPropsWithRef<Tag>["ref"];
    }
) => ReactElement | null;

export default function createPolymorphicComponent<Props, DefaultTag extends ElementType>(
  Component: <Tag extends ElementType = DefaultTag>(
    props: Props & PolymorphicComponentProps<Props, Tag>,
    ref?: ComponentPropsWithRef<Tag>["ref"]
  ) => ReactElement | null
) {
  return forwardRef(Component as any) as PolymorphicComponent<Props, DefaultTag>;
}
