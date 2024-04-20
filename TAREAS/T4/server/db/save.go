package db

func SaveData(album string, year string, artist string, ranked string) error {
	voteModel := Vote{
		Album:  album,
		Year:   year,
		Artist: artist,
		Ranked: ranked,
	}
	err := DB.Create(&voteModel).Error
	if err != nil {
		return err
	}
	return nil
}
