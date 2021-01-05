/**
 * adapted from https://github.com/SeregPie/THREE.TextSprite/blob/main/index.d.ts
 */
type TextSpriteAlignment = 'center' | 'left' | 'right';

declare namespace THREE {
  class TextSprite extends THREE.Sprite {
    constructor(
      options?: {
        // The horizontal text alignment. Possible values are 'center', 'left' and 'right'.
        alignment?: TextSpriteAlignment;
        // The background color.
        backgroundColor?: string;
        // The color.
        color?: string;
        // The font family.
        fontFamily?: string;
        // The font size.
        fontSize?: number;
        // The font style.
        fontStyle?: string;
        // The font variant.
        fontVariant?: string;
        // The font weight.
        fontWeight?: string;
        // The vertical distance between the text lines. The value is relative to the font size.
        lineGap?: number;
        // The space around the text. The value is relative to the font size.
        padding?: number;
        // The stroke color.
        strokeColor?: string;
        // The stroke width. The value is relative to the font size.
        strokeWidth?: number;
        // The text.
        text?: string;
      },
      // An instance of `THREE.Material`. If not provided, a default instance will be created.
      material?: THREE.Material,
    );

    readonly isTextSprite: true;

    text: string;

    fontFamily: string;

    fontSize: number;

    fontWeight: string;

    fontVariant: string;

    fontStyle: string;

    color: string;

    strokeWidth: number;

    strokeColor: string;

    alignment: TextSpriteAlignment;

    lineGap: number;

    padding: number;

    backgroundColor: string;

    dispose(): void;
  }
}
