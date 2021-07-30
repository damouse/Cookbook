# Notes

```
npm run start
```

##

TODO

- Fix root node encoding
- Styling + hover for code button and collapsibles
- Menu review: add better buttons
  - Collapse/Expand All
  - Theme button
  - Columns button
-

Deferred

- More testing with columns
- Persistance
- Newline persistence management
- Backend
- Undo system
- maybe making a newline in code block should make a comment, not a new code block
- Consider adding Help sider
- Consider making a code block keyboard shortcut

BUGS

- Mess with CSS for nodes and spacing (again)
- Editting text then clicking away changes where that text ends up in a bad way
- Hitting enter while on a code block should make a comment block

## Comments

I'm not sure I like the current state passthrough to widget components. It feels dirty.
I might try moving that to node components again.

Passing the state down through components is not too bad.

mobx-tree could provide undo functionality out of the box, but at the cost of
