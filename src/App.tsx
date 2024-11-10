import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types/types";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[] | null>(null);

  useEffect(() => {
    const getEntries = async () => {
      const { data } = await axios.get<DiaryEntry[]>(
        "http://localhost:3222/api/diaries"
      );
      setEntries(data);
    };
    getEntries();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const date = target.date.value;
    const weather = target.weather.value as Weather;
    const visibility = target.visibility.value as Visibility;
    const comment = target.comment.value;

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    await axios.post<DiaryEntry>("http://localhost:3222/api/diaries", newEntry);
  };

  return (
    <>
      <section>
        <h2>Add new entry</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "20vw",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="date">date:</label>
          <input type="date" id="date" name="date" />
          <label htmlFor="weather">weather</label>
          <select id="weather" name="weather">
            <option value={Weather.Sunny}>sunny</option>
            <option value={Weather.Rainy}>rainy</option>
            <option value={Weather.Cloudy}>cloudy</option>
            <option value={Weather.Stormy}>stormy</option>
            <option value={Weather.Windy}>windy</option>
          </select>
          <label htmlFor="visibility">visibility</label>
          <select id="visibility" name="visibility">
            <option value={Visibility.Great}>great</option>
            <option value={Visibility.Good}>good</option>
            <option value={Visibility.Ok}>ok</option>
            <option value={Visibility.Poor}>poor</option>
          </select>
          <label htmlFor="comment">comment</label>
          <input type="text" id="comment" name="comment" />
          <button type="submit">add</button>
        </form>
      </section>
      <section>
        <h2>Diary Entries</h2>
        {entries &&
          entries.map((entry) => (
            <div key={entry.id}>
              <h3>{entry.date}</h3>
              <p>visibility: {entry.visibility}</p>
              <p>weather: {entry.weather}</p>
              <p>comment: {entry.comment}</p>
            </div>
          ))}
      </section>
    </>
  );
};

export default App;
