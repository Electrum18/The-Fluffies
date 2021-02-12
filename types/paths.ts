import { IObject } from '~/types/basic'

interface IPath {
  length: number

  [index: number]: string | number

  [Symbol.iterator](): Iterator<string | number> {
    return {
      next() {
        return {
          value: this.current(),
          done: !this.hasMoreElements()
        }
      }
    }
  }
}

interface IPaths {
  length: number

  [index: number]: IPath
}

interface ICalculated {
  [index: string]: IPaths
}

interface IObjectProps {
  paths: IPaths
  frame: number
  range: number
  key: string
}

interface IProperties {
  [index: string]: number
}

interface ISchemeElem {
  [index: number]: string
}

interface ISchemeElemsInner {
  [index: number]: ISchemeElem
}

interface IScheme {
  [index: string]: ISchemeElemsInner | ISchemeElem | string
}

interface ICompiledPathsElem {
  [index: string]: IObject<any>
}

interface ICompiledPaths {
  keys: string[]

  [index: string]: ICompiledPathsElem | IObject<any>
}

export {
  IPaths,
  ICalculated,
  IScheme,
  ISchemeElemsInner,
  ISchemeElem,
  IProperties,
  IObjectProps,
  ICompiledPaths
}