package processing 

import (
	"fmt"
	"image/color"
)

func colorize(c color.NRGBA, ch rune) string {
	return fmt.Sprintf("\x1b[38;2;%d;%d;%dm%c\x1b[0m", c.R, c.G, c.B, ch)
}
