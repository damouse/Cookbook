import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
// :root {
//     --background-color: ${(x: any) => x.theme.colors.background_color};
//     --main_text_color: ${(x: any) => x.theme.colors.main_text_color};
//     --secondary_text_color: ${(x: any) => x.theme.colors.secondary_text_color};
//     --disabled_text_color: ${(x: any) => x.theme.colors.disabled_text_color};
//     --highlight_color:  ${(x: any) => x.theme.colors.highlight_color};
//     --tag_color:  ${(x: any) => x.theme.colors.tag_color};
//     --disabled_tag_color: ${(x: any) => x.theme.colors.disabled_tag_color};
//     --background_color:  ${(x: any) => x.theme.colors.background_color};
//     --list_card_color: ${(x: any) => x.theme.colors.list_card_color};
//   }

// h1 {
//   color: ${(x: any) => x.theme.colors.main_text_color};
// }

// Ok, I'm going to need a better way of doing this.
`

// body {
// background: ${(x: any) => x.theme.colors.body};
// color: ${(x: any) => x.theme.colors.text};
//   }
