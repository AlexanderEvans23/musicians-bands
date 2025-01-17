const { db } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await db.sync({ force: true });
  });

  test("can create a Band", async () => {
    const band1 = await Band.create({
      name: "test",
      genre: "test",
    });
    expect(band1).toEqual(
      expect.objectContaining({
        name: "test",
        genre: "test",
      })
    );
  });

  test("can create a Musician", async () => {
    const musician1 = await Musician.create({
      name: "test",
      instrument: "test",
    });
    expect(musician1).toEqual(
      expect.objectContaining({
        name: "test",
        instrument: "test",
      })
    );
  });

  test("can create a Song", async () => {
    const song1 = await Song.create({
      title: "test",
      year: 2000,
      length: 180,
    });
    expect(song1).toEqual(
      expect.objectContaining({
        title: "test",
        year: 2000,
        length: 180,
      })
    );
  });

  test("can update a Band", async () => {
    const band1 = await Band.create({
      name: "test",
      genre: "test",
    });
    const updatedBand = await band1.update({ name: "test test" });
    expect(updatedBand).toEqual(
      expect.objectContaining({
        name: "test test",
        genre: "test",
      })
    );
  });

  test("can update a Musician", async () => {
    const musician1 = await Musician.create({
      name: "test",
      instrument: "test",
    });
    const updatedMusician = await musician1.update({ name: "test test" });
    expect(updatedMusician).toEqual(
      expect.objectContaining({
        name: "test test",
        instrument: "test",
      })
    );
  });

  test("can update a Song", async () => {
    const song1 = await Song.create({
      title: "test",
      year: 2000,
      length: 180,
    });
    const updatedSong = await song1.update({ title: "test test" });
    expect(updatedSong).toEqual(
      expect.objectContaining({
        title: "test test",
        year: 2000,
        length: 180,
      })
    );
  });

  test("can delete a Band", async () => {
    const band1 = await Band.create({
      name: "test",
      genre: "test",
    });
    const goneBand = await band1.destroy();
    expect(goneBand).toEqual(
      expect.objectContaining({
        name: "test",
        genre: "test",
      })
    );
  });

  test("can delete a Musician", async () => {
    const musician1 = await Musician.create({
      name: "test",
      instrument: "test",
    });
    const goneMusician = await musician1.destroy();
    expect(goneMusician).toEqual(
      expect.objectContaining({
        name: "test",
        instrument: "test",
      })
    );
  });

  test("can delete a Song", async () => {
    const song1 = await Song.create({
      title: "test",
      year: 2000,
      length: 180,
    });
    const goneSong = await song1.destroy();
    expect(goneSong).toEqual(
      expect.objectContaining({
        title: "test",
        year: 2000,
        length: 180,
      })
    );
  });

  test("band can have many musicians", async () => {
    const myBand = await Band.create({
      name: "test",
      genre: "test",
    });
    const musician1 = await Musician.create({
      name: "test",
      instrument: "test",
    });
    const musician2 = await Musician.create({
      name: "test",
      instrument: "test",
    });
    await myBand.addMusician(musician1);
    await myBand.addMusician(musician2);
    
    const takenMusicians = await myBand.getMusicians();

    expect(takenMusicians.length).toBe(2)
    expect(takenMusicians[0] instanceof Musician).toBeTruthy()
  })

  test("Band can have many songs", async () => {
    let myBand = await Band.create({
      name: "test",
      genre: "test",
    });
    let song1 = await Song.create({
      title: "test",
      year: "test",
      length: "test",
    });
    let song2 = await Song.create({
      title: "test",
      year: "test",
      length: "test",
    });
    await myBand.addSong(song1);
    await myBand.addSong(song2);
    
    const takenSongs = await myBand.getSongs();

    console.log(takenSongs)

    expect(takenSongs.length).toBe(2)
    expect(takenSongs[0] instanceof Song).toBeTruthy()
    expect(takenSongs[1] instanceof Song).toBeTruthy()
  })

});
