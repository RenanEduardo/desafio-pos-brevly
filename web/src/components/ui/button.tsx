import { Slot } from "@radix-ui/react-slot"
import type { ComponentProps } from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonVariants = tv({
	base: 'font-brevly font-semibold justify-center items-center disabled:opacity-50',

	variants: {
  size: {
   primary: 'flex h-12 w-full py-0 px-5 gap-3 rounded-lg bg-blue-base text-white text-md hover:bg-blue-dark disabled:bg-blue-base',
   secondary: 'inline-flex h-8 w-auto py-0 px-2 rounded gap-1.5 bg-gray-200 text-gray-500 text-sm text-center hover:outline hover:outline-blue-base',
   icon: 'flex h-8 w-8 gap-2 rounded bg-gray-200 hover:outline hover:outline-blue-base',
  },

	},

	defaultVariants: {
		size: 'primary',
	},
});


type ButtonProps = ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

export function Button(props: ButtonProps) {
 const {asChild, size, className} = props
 const Component = asChild ? Slot : 'button';


	return (
		<Component className={buttonVariants({ size, className })} {...props} />
	);
}