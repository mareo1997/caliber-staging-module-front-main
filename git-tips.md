<div style="text-align:center"><img src="https://avatars3.githubusercontent.com/u/18133?s=200&v=4" /></div>

# Git Tips for Project 3

**IMPORTANT NOTE:**

*Each team will have their own branch. Please check with your team lead before pushing any changes to the main branch.*

*This documentation is a good Git reference in order to maintain an Agile workflow between teams during this project.*

# Basic Branch Flow for Project 3
                       main
                        |
    ----------------------------------------
    |                   |                   |
    Team-1             Team-2               Team-3
    |                   |                   |
    |                   |                   |
    [T1-Branches]       [T2-Branches]       [T3-Branches]

# To merge a branch with the main branch
```git fetch origin```        

* this will update your machine to the remote repo

```git merge origin/main``` 

* You can replace main with any branch name to merge FROM that branch

# If there are any conflicts, just go into your editor and fix them, it'll point them out and the differences. Pick and choose what you want. Afterwards...
```
git add . 
git commit -m "Your message"
git push
```

# Move between branches
```
git fetch origin
git checkout <yourbranchname>
```

# I pushed something and I want it down! How?
```
git rm -r --cached <filename, filepath, or folder name>
```

# Remember to use
```
git status
```

* for more information on what you need to do.

```
git log --graph --all
```

* to view **all** activity of **every** branch in the repository.

# Other Helpful Git References:
* [Git Troubleshooting for Beginners](https://ohshitgit.com/)

* [SourceTree - A Free Git GUI to ease your local and remote Git management](https://www.sourcetreeapp.com/)

* [Git Team Workflow Practices](https://opensource.com/article/20/7/git-best-practices)

# Lastly...

*If you run across any helpful resources or other troubleshooting tips, please share them here on this markdown file to share with others.*

