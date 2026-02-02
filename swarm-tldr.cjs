const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, LevelFormat, BorderStyle, WidthType, 
        ShadingType } = require('docx');
const fs = require('fs');

const COLORS = {
  primary: "1B4F72",
  secondary: "2E86AB",
  accent: "F39C12",
  light: "EBF5FB",
  dark: "2C3E50",
  gray: "7F8C8D",
  white: "FFFFFF"
};

const doc = new Document({
  styles: {
    default: { 
      document: { 
        run: { font: "Arial", size: 20 }
      } 
    }
  },
  numbering: {
    config: [
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 360 } } }
        }]
      },
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 720, right: 720, bottom: 720, left: 720 }
      }
    },
    children: [
      // Header
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [10800],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
                margins: { top: 150, bottom: 150, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "THE SWARM METHOD", bold: true, size: 36, color: COLORS.white, font: "Arial" })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "TL;DR — One Page Summary", size: 20, color: COLORS.white, font: "Arial" })]
                  })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 150 } }),

      // The Manifesto
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "THE MANIFESTO", bold: true, size: 22, color: COLORS.primary })]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [10800],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { 
                  left: { style: BorderStyle.SINGLE, size: 16, color: COLORS.accent },
                  top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }
                },
                margins: { top: 80, bottom: 80, left: 150, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Attempts over perfection  •  Validated outcomes over activity  •  Parallel exploration over sequential planning  •  Compounding systems over one-time solutions  •  Real problems over assumed problems", size: 18, color: COLORS.dark })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 150 } }),

      // Two column layout
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [5400, 5400],
        rows: [
          new TableRow({
            children: [
              // Left column
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 0, bottom: 0, left: 0, right: 150 },
                width: { size: 5400, type: WidthType.DXA },
                children: [
                  // Four Laws
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [new TextRun({ text: "THE FOUR LAWS", bold: true, size: 20, color: COLORS.primary })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    spacing: { after: 40 },
                    children: [
                      new TextRun({ text: "Attempts Over Perfection", bold: true, size: 18 }),
                      new TextRun({ text: " — 10 experiments beat 1 perfect attempt", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    spacing: { after: 40 },
                    children: [
                      new TextRun({ text: "Humans for Direction, Agents for Distance", bold: true, size: 18 }),
                      new TextRun({ text: " — you own what/why, agents own how", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    spacing: { after: 40 },
                    children: [
                      new TextRun({ text: "Rigor Scales With Volume", bold: true, size: 18 }),
                      new TextRun({ text: " — more spawns = sharper kill criteria", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    spacing: { after: 150 },
                    children: [
                      new TextRun({ text: "Compound or Decay", bold: true, size: 18 }),
                      new TextRun({ text: " — every solution becomes a template", size: 18 })
                    ]
                  }),

                  // Nine Tenets
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [new TextRun({ text: "THE NINE TENETS", bold: true, size: 20, color: COLORS.primary })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Discover Before You Deliver", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Intent Over Instruction", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Parallel by Default", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Context is Currency", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Small Bets, Fast Funerals", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Humans Hold the Why", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Mastery Through Direction", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Ship the Learning", size: 18 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "numbers", level: 0 },
                    children: [new TextRun({ text: "Humans Rest, Agents Run", size: 18 })]
                  }),
                ]
              }),
              // Right column
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 0, bottom: 0, left: 150, right: 0 },
                width: { size: 5400, type: WidthType.DXA },
                children: [
                  // Swarm Cycle
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [new TextRun({ text: "THE SWARM CYCLE", bold: true, size: 20, color: COLORS.primary })]
                  }),
                  new Paragraph({
                    spacing: { after: 100 },
                    children: [
                      new TextRun({ text: "SPAWN", bold: true, size: 18, color: COLORS.primary }),
                      new TextRun({ text: " → ", size: 18 }),
                      new TextRun({ text: "SWARM", bold: true, size: 18, color: COLORS.secondary }),
                      new TextRun({ text: " → ", size: 18 }),
                      new TextRun({ text: "SELECT", bold: true, size: 18, color: COLORS.accent }),
                      new TextRun({ text: " → ", size: 18 }),
                      new TextRun({ text: "SCALE", bold: true, size: 18, color: COLORS.dark }),
                      new TextRun({ text: " → repeat", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Spawn: ", bold: true, size: 18 }),
                      new TextRun({ text: "Validate problem, launch 3-5 parallel experiments", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Swarm: ", bold: true, size: 18 }),
                      new TextRun({ text: "Agents execute while humans judge", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Select: ", bold: true, size: 18 }),
                      new TextRun({ text: "Kill losers fast, extract learnings", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    spacing: { after: 150 },
                    children: [
                      new TextRun({ text: "Scale: ", bold: true, size: 18 }),
                      new TextRun({ text: "Double down on winners, templatize", size: 18 })
                    ]
                  }),

                  // Artifacts
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [new TextRun({ text: "THE FIVE ARTIFACTS", bold: true, size: 20, color: COLORS.primary })]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Context Vault", bold: true, size: 18 }),
                      new TextRun({ text: " — single source of truth", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Agent Roster", bold: true, size: 18 }),
                      new TextRun({ text: " — agent capabilities & prompts", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Velocity Log", bold: true, size: 18 }),
                      new TextRun({ text: " — daily shipped/killed/learned", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Problem Stack", bold: true, size: 18 }),
                      new TextRun({ text: " — prioritized customer problems", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    spacing: { after: 150 },
                    children: [
                      new TextRun({ text: "Template Library", bold: true, size: 18 }),
                      new TextRun({ text: " — reusable workflows", size: 18 })
                    ]
                  }),

                  // Ceremonies
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [new TextRun({ text: "THE SIX CEREMONIES", bold: true, size: 20, color: COLORS.primary })]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Swarm Launch", bold: true, size: 18 }),
                      new TextRun({ text: " — daily 10min orientation", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Customer Heartbeat", bold: true, size: 18 }),
                      new TextRun({ text: " — weekly direct contact", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Convergence", bold: true, size: 18 }),
                      new TextRun({ text: " — weekly 45min synthesis", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Funeral", bold: true, size: 18 }),
                      new TextRun({ text: " — 15min to kill & learn", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Handoff", bold: true, size: 18 }),
                      new TextRun({ text: " — context transfer ritual", size: 18 })
                    ]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [
                      new TextRun({ text: "Calibration", bold: true, size: 18 }),
                      new TextRun({ text: " — quarterly system evolution", size: 18 })
                    ]
                  }),
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 150 } }),

      // Footer
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [10800],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { 
                  top: { style: BorderStyle.SINGLE, size: 8, color: COLORS.accent },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: COLORS.accent },
                  left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }
                },
                margins: { top: 100, bottom: 100, left: 150, right: 150 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({ text: "Everyone does product work. Everyone connects problems to strategy. Everyone decides what swarms to create.", size: 18, color: COLORS.dark })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 50 },
                    children: [
                      new TextRun({ text: "Maximize attempts on real problems. Test into outcomes. Swarm the solution.", bold: true, size: 20, color: COLORS.primary })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/eager-amazing-newton/mnt/Antigravity/Swarm-Method-TLDR.docx", buffer);
  console.log("TL;DR created: Swarm-Method-TLDR.docx");
});
