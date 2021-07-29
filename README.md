# Notes

```
npm run start
```

##

TODO

- Fix root node encoding
- Code button, and review button position (check laptop progress)
- Understand cursor position-- need to know when we can delete and move to the
- Delete when empty
- shift + delete

- Menu review: add better buttons

  - Collapse/Expand All
  - Theme button
  - Columns button

- Make intermediate text fields multi-column

Deferred

- More testing with columns
- Persistance
- Newline persistence management
- Backend
- Undo system

BUGS

- Mess with CSS for nodes and spacing (again)
- Editting text then clicking away changes where that text ends up in a bad way
- Hitting enter while on a code block should make a comment block

## Comments

I'm not sure I like the current state passthrough to widget components. It feels dirty.
I might try moving that to node components again.

Passing the state down through components is not too bad.
