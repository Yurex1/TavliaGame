import InstructionDTO from "./instructionDTO";

export const EnglishDto = {
    Title: "Instruction",
    FirstSubTitle: "Basic Information About the Game",
    FirstSubTitleFirstLable:
      " Tavliya is one of the oldest board games, originating from Scandinavia. Unfortunately, the exact rules of the game have not survived to our times, so we will use some of the most probable ones.",
    FirstSubTitleSecondLable: " Different board sizes are used for the game: 7x7, 9x9, and 11x11.",
    FirstSubTitleThirdLable: " Regardless of the board size, the rules of the game are the same.",
    SecondSubTitle: "Game Rules",
    SecondSubTitleFirstLable: "The game is an imitation of how barbarians ambushed the king with his defenders.",
    SecondSubTitleSecondLable: "The game starts with the king.",
    SecondSubTitleThirdLable: " The king is placed in the center of the board, surrounded byhis knights.",
    SecondSubTitleFourthLable: " Barbarians are positioned on four sides of the board, with twice the number of barbarians compared to knights.",     
    SecondSubTitleFifthLable: `<b>All</b> pieces move horizontally or vertically to anynumber of free cells.`,
    SecondSubTitleSixthLable: "To capture an opponent`s piece, it must be surrounded with <b>your</b> moves from two opposite sides.",
    SecondSubTitleSeventhLable: " The king wins if he escapes from the ambush, reaching one of the 4 corner cells.",
    SecondSubTitleEighthLable: "No one, except the king, can occupy corner cells.",
    SecondSubTitleNinthLable: "Barbarians win when they surround the king from all 4 sides.",
    SecondSubTitleTenthLable: "Being unable to make a move is a loss.", 
} as InstructionDTO;