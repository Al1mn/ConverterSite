package processing

import (
	"image"
	"image/color"
	"strings"
)

var asciiChars = []rune("`.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@")

func brightnessToChar(b uint8) rune {
	scale := float64(b) / 255.0
	index := int(scale * float64(len(asciiChars)-1))
	return asciiChars[len(asciiChars)-1-index]
}

func ConvertToASCII(img *image.Gray, srcImg image.Image, useColor bool) string {
	var builder strings.Builder
	bounds := img.Bounds()

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			b := img.GrayAt(x, y).Y
			char := brightnessToChar(b)
			if useColor {
				nrgba := color.NRGBAModel.Convert(srcImg.At(x, y)).(color.NRGBA)
				builder.WriteString(colorize(nrgba, char))
			} else {
				builder.WriteRune(char)
			}
		}
		builder.WriteString("\n")
	}
	return builder.String()
}
