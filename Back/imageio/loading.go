package imageio

import (
	"bytes"
	"image"
	_ "image/jpeg"
)

func LoadImage(data []byte) (image.Image, error) {
	f := bytes.NewReader(data)

	img, _, err := image.Decode(f)
	if err != nil {
		return nil, err
	}
	return img, nil
}
