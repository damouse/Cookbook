# Notes

```
npm run start
```

##

TODO

- Styling + hover for code button and collapsibles
- Menu review: add better buttons
  - Collapse/Expand All
  - Theme button
  - Columns button
- Creating a new node while on the first line of an existing node should insert a node before

Deferred

- Try and Find Out 
  - Its hard to tell what works and what doesn't without real content in here. Maybe time to try out persistence.
- More testing with columns
- Persistance
- Newline persistence management
- Backend
- Undo system
- maybe making a newline in code block should make a comment, not a new code block
- Consider adding Help sider
- Consider making a code block keyboard shortcut
- Fix root node encoding

BUGS

- Mess with CSS for nodes and spacing (again)
- Editting text then clicking away changes where that text ends up in a bad way
- Hitting enter while on a code block should make a comment block

## Comments

I'm not sure I like the current state passthrough to widget components. It feels dirty.
I might try moving that to node components again.

Passing the state down through components is not too bad.

mobx-tree could provide undo functionality out of the box, but at the cost of
