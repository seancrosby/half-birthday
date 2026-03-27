declare module 'crosby-ui' {
  import { ReactNode, ChangeEvent } from 'react'

  export interface ContainerProps {
    children: ReactNode
  }
  export const Container: (props: ContainerProps) => JSX.Element

  export interface HeaderProps {
    logo: string
    subtitle: string
  }
  export const Header: (props: HeaderProps) => JSX.Element

  export interface InputGroupProps {
    label: string
    id: string
    type: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }
  export const InputGroup: (props: InputGroupProps) => JSX.Element

  export interface ComputeButtonProps {
    onClick: () => void
    disabled?: boolean
    children: ReactNode
  }
  export const ComputeButton: (props: ComputeButtonProps) => JSX.Element

  export interface ResultCardProps {
    title: string
    value: string | null | undefined
    detail?: string | null
    tooltip: string
  }
  export const ResultCard: (props: ResultCardProps) => JSX.Element

  export interface ResultsListProps {
    show: boolean
    children: ReactNode
  }
  export const ResultsList: (props: ResultsListProps) => JSX.Element

  export interface FooterProps {
    text: string
  }
  export const Footer: (props: FooterProps) => JSX.Element
}
