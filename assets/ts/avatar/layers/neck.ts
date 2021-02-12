import shortcuts from '~/assets/json/configs/shortcuts.json'
import { ILibrary, IShortcutsJSON } from '~/types/graphics'

const None = undefined

const { Is, Color } = (shortcuts as unknown) as IShortcutsJSON

export default ({ Elem, Outline, Layer, VarElem, VarOutline }: ILibrary) => {
  return Layer(
    None,
    None,
    Elem('neck', 'fur_basic'),

    Elem('fur_second_chest', 'fur_second_basic', ['fur_second_color']),

    Elem('stripes_neck', 'stripes_basic', Is.stripes),

    Outline('neck', 'fur_shade'),

    Elem('fluff_chest', Color.furSecond, ['fluff_chest']),
    Outline('fluff_chest', Color.furSecondOutline, ['fluff_chest']),

    VarElem('clothing', 'chest', 'clothing_basic'),
    VarOutline('clothing', 'chest', 'clothing_shade'),

    Elem('collar', 'collar_basic', ['collar_enable']),
    Outline('collar', 'collar_shade', ['collar_enable']),
    Elem('collar_end', 'collar_shade', ['collar_enable']),

    Elem('bowtie_ends', 'bowtie_basic', ['bowtie_enable']),
    Outline('bowtie_ends', 'bowtie_shade', ['bowtie_enable']),
    Elem('bowtie', 'bowtie_basic', ['bowtie_enable']),
    Outline('bowtie', 'bowtie_shade', ['bowtie_enable']),
    Elem('bowtie_parts', 'bowtie_shade', ['bowtie_enable']),

    Elem('scarf', 'scarf_basic', ['scarf']),
    Outline('scarf', 'scarf_shade', ['scarf']),
    Elem('scarf_front', 'scarf_basic', ['scarf']),
    Outline('scarf_front', 'scarf_shade', ['scarf']),
    Elem('scarf_details', 'scarf_shade', ['scarf'])
  )
}
