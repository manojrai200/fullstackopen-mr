import { createSlice } from "@reduxjs/toolkit";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const id = action.payload;
      const voteToAdd = state.find((a) => a.id === id);
      const changedVote = { ...voteToAdd, votes: voteToAdd.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedVote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { setAnecdotes, createAnecdote, addVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
