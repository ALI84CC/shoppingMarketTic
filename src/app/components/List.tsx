import { type ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { tv, type VariantProps } from "tailwind-variants"

  const listVariants = tv({
    variants:{
      variant:{
        primary: "flex rounded-md px1 py-4 text-sm  capitalize  text-gray-700 houver:bg-gray-200",
      },
    },
      defaultVariants:{
       variant:"primary",
      }
  })

type ListProps = ComponentProps<"li"> & VariantProps<typeof listVariants>

const List = ({children, className, onClick,variant, ...props}: ListProps)=>{

  const listClass = twMerge(listVariants({variant}), className)

 return <li className={listClass} onClick={onClick} {...props}>
      {children}
  </li>
}

export default List;
