const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, PageBreak } = require('docx');
const fs = require('fs');

// Color palette
const COLORS = {
  primary: "1B4F72",
  secondary: "2E86AB",
  accent: "F39C12",
  light: "EBF5FB",
  dark: "2C3E50",
  gray: "7F8C8D",
  white: "FFFFFF",
  red: "C0392B",
  green: "27AE60"
};

const doc = new Document({
  styles: {
    default: { 
      document: { 
        run: { font: "Arial", size: 22 }
      } 
    },
    paragraphStyles: [
      { 
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 48, bold: true, font: "Arial", color: COLORS.primary },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      { 
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: COLORS.secondary },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
      },
      { 
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: COLORS.dark },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
      },
    ]
  },
  numbering: {
    config: [
      {
        reference: "principles",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "subbullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // ========== TITLE PAGE ==========
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "THE SWARM METHOD", size: 72, bold: true, font: "Arial", color: COLORS.primary })]
      }),
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "A Productivity Framework for Agent-Enabled Teams", size: 28, font: "Arial", color: COLORS.secondary })]
      }),
      new Paragraph({ spacing: { before: 400 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Maximize Attempts. Test Into Outcomes.", size: 24, italics: true, font: "Arial", color: COLORS.gray })]
      }),
      new Paragraph({ spacing: { before: 1600 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Version 2.0", size: 22, font: "Arial", color: COLORS.gray })]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== THE MANIFESTO ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Swarm Manifesto")]
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({ text: "We are discovering better ways of building by doing it and helping others do it. Through this work we have come to value:", size: 24 })]
      }),

      // Manifesto values table
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [9360],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { 
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.SINGLE, size: 24, color: COLORS.primary },
                  right: { style: BorderStyle.NONE }
                },
                margins: { top: 300, bottom: 300, left: 300, right: 300 },
                children: [
                  new Paragraph({
                    spacing: { after: 200 },
                    children: [
                      new TextRun({ text: "Attempts over perfection", bold: true, size: 28, color: COLORS.primary }),
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 200 },
                    children: [
                      new TextRun({ text: "Validated outcomes over activity metrics", bold: true, size: 28, color: COLORS.primary }),
                    ]
                  }),
                  new Paragraph({
                    spacing: { after: 200 },
                    children: [
                      new TextRun({ text: "Parallel exploration over sequential planning", bold: true, size: 28, color: COLORS.primary }),
                    ]
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Compounding systems over one-time solutions", bold: true, size: 28, color: COLORS.primary }),
                    ]
                  }),
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 200 } }),
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({ text: "That is, while there is value in the items on the right, we value the items on the left more.", size: 24, italics: true })]
      }),

      // Four principles
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Four Principles")]
      }),
      
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "1. Attempts Over Perfection", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The team that runs 10 experiments beats the team that perfects 1. When agent labor is abundant, the winning strategy shifts from optimizing single attempts to maximizing learning velocity across many attempts.", size: 22 })]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "2. Validated Outcomes Over Activity Metrics", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The measure of progress is problems solved, not experiments run. High attempt volume is only valuable when paired with rigorous evaluation. We count wins, not swings.", size: 22 })]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "3. Parallel Exploration Over Sequential Planning", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "When you can explore five paths simultaneously, the cost of planning the \"right\" path exceeds the cost of trying all five. We spawn, swarm, select, and scale—we don't plan, debate, commit, and execute.", size: 22 })]
      }),

      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "4. Compounding Systems Over One-Time Solutions", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Every solved problem should make the next problem easier. We build templates, not just deliverables. We ship the learning, not just the work. Velocity compounds or decays—there is no steady state.", size: 22 })]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== THE CORE INSIGHT ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Core Insight")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "The bottleneck has shifted.", bold: true, size: 24 }),
          new TextRun({ text: " In the pre-agent world, success came from careful planning and flawless execution—because labor was expensive and attempts were limited. In the agent-enabled world, success comes from ", size: 24 }),
          new TextRun({ text: "maximizing quality attempts", bold: true, size: 24 }),
          new TextRun({ text: " and testing your way into better outcomes.", size: 24 })
        ]
      }),

      // Reframe box
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [9360],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { 
                  top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary },
                  left: { style: BorderStyle.SINGLE, size: 24, color: COLORS.accent },
                  right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.secondary }
                },
                margins: { top: 200, bottom: 200, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "THE REFRAME", bold: true, size: 24, color: COLORS.primary })]
                  }),
                  new Paragraph({
                    spacing: { before: 100 },
                    children: [
                      new TextRun({ text: "Old question: ", color: COLORS.gray, size: 22 }),
                      new TextRun({ text: "\"How do I manage my tasks?\"", italics: true, size: 22 })
                    ]
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Swarm question: ", color: COLORS.accent, size: 22, bold: true }),
                      new TextRun({ text: "\"How do I maximize quality attempts on this problem?\"", italics: true, bold: true, size: 22 })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 200 } }),

      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "You are no longer a worker. You are a swarm coordinator orchestrating:", size: 24 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Your focused attention", bold: true, size: 24 }),
          new TextRun({ text: " (scarce, high-judgment)", size: 24 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Your AI agents", bold: true, size: 24 }),
          new TextRun({ text: " (abundant, parallel, tireless)", size: 24 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Your team's human intelligence", bold: true, size: 24 }),
          new TextRun({ text: " (creative, contextual, relational)", size: 24 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Your team's agent fleet", bold: true, size: 24 }),
          new TextRun({ text: " (scalable, persistent, coordinated)", size: 24 })
        ]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== THE FOUR LAWS ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Four Laws of Swarm Velocity")]
      }),
      
      // Law 1
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Law 1: Attempts Over Perfection")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "The team that runs 10 experiments beats the team that perfects 1.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "In an agent-enabled world, the cost of trying dropped by 10x. Your strategy must reflect this. Stop optimizing individual attempts. Start maximizing attempt volume and learning velocity.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "\"I will not perfect my first attempt. I will launch multiple approaches, kill losers fast, and double down on winners.\"", italics: true, size: 22, color: COLORS.dark })]
      }),

      // Law 2
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Law 2: Humans for Direction, Agents for Distance")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({ text: "Humans decide ", size: 24 }),
          new TextRun({ text: "what", bold: true, size: 24 }),
          new TextRun({ text: " and ", size: 24 }),
          new TextRun({ text: "why", bold: true, size: 24 }),
          new TextRun({ text: ". Agents execute ", size: 24 }),
          new TextRun({ text: "how", bold: true, size: 24 }),
          new TextRun({ text: " across vast territory.", size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "The moment you're doing repetitive execution, you've inverted the swarm. The moment agents are making judgment calls about direction, you've lost control.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "\"I hold the why. My agents cover the ground.\"", italics: true, size: 22, color: COLORS.dark })]
      }),

      // Law 3
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Law 3: Rigor Scales With Volume")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "The more you spawn, the sharper your kill criteria must be.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "High attempt volume without evaluation rigor produces noise, not signal. Define success criteria before spawning. Evaluate ruthlessly. Measure outcomes, not activity.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "\"Fast funerals require clear autopsies. I define what winning looks like before I start.\"", italics: true, size: 22, color: COLORS.dark })]
      }),

      // Law 4
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Law 4: Compound or Decay")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "Every workflow either builds toward reusability or decays into one-time effort.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "Swarm teams build systems that build systems. Each solved problem becomes a template. Each successful experiment becomes a playbook. Velocity compounds.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "\"My goal is not to finish tasks. My goal is to finish them in ways that make the next attempt faster.\"", italics: true, size: 22, color: COLORS.dark })]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== THE EIGHT TENETS ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Eight Tenets")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "These are the beliefs that high-velocity swarm teams hold as non-negotiable.", size: 24 })]
      }),

      // Tenet 1
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("1. Intent Over Instruction")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Write detailed specifications", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Articulate clear intent with success criteria, let agents find the path", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"I will not write instructions for what intelligence can infer. I will be precise about outcomes, loose about methods.\"", italics: true, size: 22 })]
      }),

      // Tenet 2
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("2. Parallel by Default")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Sequential task lists", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Fan out work across agents, converge for synthesis", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"If I'm waiting, I'm wasting. My agents should be moving while I think.\"", italics: true, size: 22 })]
      }),

      // Tenet 3
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("3. Context is Currency")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Knowledge lives in heads and docs", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Externalize context so any agent can pick up instantly", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"The richest team is the one where nothing lives only in someone's head.\"", italics: true, size: 22 })]
      }),

      // Tenet 4
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("4. Small Bets, Fast Funerals")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Plan extensively, execute once", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Spawn multiple approaches, kill losers quickly, double down on winners", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"I will not fall in love with my first attempt. I will let agents explore while I evaluate.\"", italics: true, size: 22 })]
      }),

      // Tenet 5
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("5. Humans Hold the Why")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Humans do everything, including drudgery", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Humans guard purpose, judgment, relationships—agents handle volume", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"I will never delegate my values. I will always delegate my labor.\"", italics: true, size: 22 })]
      }),

      // Tenet 6
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("6. Mastery Through Direction")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Learn by doing the work yourself", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Develop expertise by directing many attempts and evaluating results", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"I become expert not by doing more, but by seeing more. I learn from the full distribution of outcomes, not a single path.\"", italics: true, size: 22 })]
      }),

      // Tenet 7
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("7. Ship the Learning")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Complete work, move on", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Every completed workflow becomes a template for future acceleration", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"My goal is not to finish tasks. My goal is to finish them in ways that make the next one faster.\"", italics: true, size: 22 })]
      }),

      // Tenet 8
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("8. Humans Rest, Agents Run")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4200, 4200],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Old Way", bold: true, color: COLORS.gray, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Work expands to fill available time", size: 20 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                width: { size: 4200, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "Swarm Way", bold: true, color: COLORS.accent, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: "Agents work overnight; humans have boundaries and sustainable pace", size: 20 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 100, after: 200 },
        children: [new TextRun({ text: "\"My agents are tireless. I am not. I design for overnight agent work and morning human synthesis.\"", italics: true, size: 22 })]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== THE SWARM CYCLE ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Swarm Cycle")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The core operational loop. Run this cycle continuously to test into better outcomes.", size: 24 })]
      }),

      // Cycle diagram
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2340, 2340, 2340, 2340],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.white } },
                margins: { top: 150, bottom: 150, left: 100, right: 100 },
                width: { size: 2340, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1. SPAWN", bold: true, color: COLORS.white, size: 24 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 }, children: [new TextRun({ text: "Launch parallel experiments", color: COLORS.white, size: 18 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.secondary, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.white } },
                margins: { top: 150, bottom: 150, left: 100, right: 100 },
                width: { size: 2340, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2. SWARM", bold: true, color: COLORS.white, size: 24 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 }, children: [new TextRun({ text: "Agents execute in parallel", color: COLORS.white, size: 18 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.accent, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.white } },
                margins: { top: 150, bottom: 150, left: 100, right: 100 },
                width: { size: 2340, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3. SELECT", bold: true, color: COLORS.white, size: 24 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 }, children: [new TextRun({ text: "Evaluate, kill losers fast", color: COLORS.white, size: 18 })] })
                ]
              }),
              new TableCell({
                shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 150, bottom: 150, left: 100, right: 100 },
                width: { size: 2340, type: WidthType.DXA },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4. SCALE", bold: true, color: COLORS.white, size: 24 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 }, children: [new TextRun({ text: "Double down on winners", color: COLORS.white, size: 18 })] })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 300 } }),

      // Spawn
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1. SPAWN: Define Intent, Launch Variants")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "Never start with one approach. Define your success criteria, then spawn 3-5 parallel experiments.", size: 24 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Write a clear Intent Brief: outcome, success criteria, constraints", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Define kill criteria BEFORE launching (what would make you stop?)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Identify 3-5 different approaches to test", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 200 },
        children: [new TextRun({ text: "Assign each approach to an agent or agent chain", size: 22 })]
      }),

      // Swarm
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2. SWARM: Parallel Execution")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "While agents execute, you think. Your job during swarming is judgment, not labor.", size: 24 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Agents work in parallel on different approaches", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Human monitors for early signals, adjusts direction", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Context flows through shared systems (Context Vault)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 200 },
        children: [new TextRun({ text: "Design agent tasks to complete overnight when possible", size: 22 })]
      }),

      // Select
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3. SELECT: Rigorous Evaluation")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "Kill approaches quickly and without sentiment. The goal is learning velocity, not sunk cost recovery.", size: 24 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Evaluate results against pre-defined criteria (no moving goalposts)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Kill underperformers immediately—hold a Funeral", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Extract learnings: what worked, what didn't, what surprised us", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 200 },
        children: [new TextRun({ text: "Review agent output quality—volume without quality is noise", size: 22 })]
      }),

      // Quality control callout
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [9360],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "FDF2E9", type: ShadingType.CLEAR },
                borders: { 
                  top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.accent },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.accent },
                  left: { style: BorderStyle.SINGLE, size: 24, color: COLORS.red },
                  right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.accent }
                },
                margins: { top: 150, bottom: 150, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "QUALITY CHECKPOINT", bold: true, size: 22, color: COLORS.red })]
                  }),
                  new Paragraph({
                    spacing: { before: 100 },
                    children: [new TextRun({ text: "Before scaling any winner, verify:", size: 20 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [new TextRun({ text: "Does it actually solve the problem, or just produce output?", size: 20 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [new TextRun({ text: "Would a human expert approve this quality?", size: 20 })]
                  }),
                  new Paragraph({
                    numbering: { reference: "bullets", level: 0 },
                    children: [new TextRun({ text: "Did it pass the success criteria we defined before spawning?", size: 20 })]
                  })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 200 } }),

      // Scale
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4. SCALE: Double Down on Winners")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "Pour resources into what's working. Successful experiments become templates for the next swarm.", size: 24 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Allocate more agent resources to winning approaches", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Refine and optimize the best solution", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Document what worked as a template in the Library", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 200 },
        children: [new TextRun({ text: "Feed learnings back into the next SPAWN", size: 22 })]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== THE ARTIFACTS ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Five Artifacts")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "Living documents that enable swarm coordination. These exist so any agent or human can pick up work instantly.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Adapt these to your team. The artifacts below are starting points—if a different format serves you better, use it. The principle matters more than the template.", italics: true, size: 22 })]
      }),

      // Artifact 1
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1. The Context Vault")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "A single source of truth that any agent or human can query to understand the project's state, decisions, and direction.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Contents:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Project intent statement (the why)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Current state summary (auto-updated)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Decision log with reasoning", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Active experiments and their hypotheses", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Glossary of project-specific terms", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: If it's not in the Vault, it doesn't exist. Every agent conversation starts with Vault context.", italics: true, size: 22 })]
      }),

      // Artifact 2
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2. The Agent Roster")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "A documented inventory of your agent capabilities and working styles.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Contents:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Each agent's role and specialty", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Prompt templates that work for each", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Known limitations and failure modes", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Handoff protocols between agents", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: Treat agents like team members. Onboard new humans by sharing the Roster.", italics: true, size: 22 })]
      }),

      // Artifact 3
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3. The Velocity Log")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "A lightweight record of what shipped, what got killed, and what got learned—daily.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Contents:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "What moved from doing to done", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "What got abandoned and why (funerals held)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "What surprised us", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "What should become a template", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: 5 minutes to update. Creates compound learning. Your team's memory of how to move fast.", italics: true, size: 22 })]
      }),

      // Artifact 4
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4. The Intent Brief")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "A one-page document created at the start of any swarm.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Contents:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Outcome we want (not output)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "How we'll know we succeeded (measurable)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Kill criteria (what makes us stop)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Constraints that matter / constraints that don't", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "First experiments to spawn", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: No swarm starts without an Intent Brief. Intent Briefs are disposable—if reality changes, write a new one.", italics: true, size: 22 })]
      }),

      // Artifact 5
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5. The Template Library")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "A growing collection of reusable workflows, prompts, and patterns.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Contents:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Proven agent chains for recurring tasks", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Prompt templates that reliably produce quality", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Scaffolds for common deliverables", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Starter kits for new project types", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: Solve a problem twice, the second solution becomes a template. This is how velocity compounds.", italics: true, size: 22 })]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== THE CEREMONIES ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Five Ceremonies")]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun({ text: "Rituals that sync the human layer. These are the only required synchronous moments.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Adapt these to your team. If a ceremony isn't adding value, change it or drop it in your Quarterly Calibration. The goal is synthesis, not ritual compliance.", italics: true, size: 22 })]
      }),

      // Ceremony 1
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1. The Swarm Launch (Daily, 10 min)")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "Orient the swarm for the day. Set direction, then disperse.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Format:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Each person: \"Today I'm spawning experiments on...\"", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Quick scan of overnight agent work", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Identify blockers that need human intervention", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Assign agent tasks for parallel execution", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: Standing. No laptops. Voice and intent only. Then disperse to your agents.", italics: true, size: 22 })]
      }),

      // Ceremony 2
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2. The Convergence (Weekly, 45 min)")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "Synthesize learnings and recalibrate direction.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Format:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Review Velocity Log: shipped, killed, surprised", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Surface patterns: what's working, what's not", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Update Context Vault with decisions", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Identify templates to add to Library", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Stakeholder synthesis: what do external parties need to know?", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: This is the ONLY standing meeting. We meet to make meaning, not share updates.", italics: true, size: 22 })]
      }),

      // Ceremony 3
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3. The Funeral (As needed, 15 min)")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "Formally kill experiments that aren't working and extract their learnings.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Format:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "State what we tried", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "State why it's not working (against pre-defined criteria)", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Extract learnings worth keeping", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Explicitly declare it dead", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Celebrate the fast learning", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: Make killing things a ritual worth doing. Teams that can't kill can't swarm fast.", italics: true, size: 22 })]
      }),

      // Ceremony 4
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4. The Handoff (At transitions)")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "Transfer context so work continues without the originator.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Format:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Update all artifacts to current state", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "5-minute video: \"what matters and why\"", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Live handoff where receiver teaches back understanding", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Name what's NOT in the docs", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: A project isn't done until anyone could pick it up.", italics: true, size: 22 })]
      }),

      // Ceremony 5
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5. The Calibration (Quarterly, half day)")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Purpose: ", bold: true, size: 22 }),
          new TextRun({ text: "Evolve the system itself.", size: 22 })
        ]
      }),
      new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: "Format:", bold: true, size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Is our agent fleet configured right?", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Are our artifacts actually being used?", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Are our ceremonies adding value or just ritual?", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "What ceremonies should we drop or change?", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "What new capabilities should we integrate?", size: 22 })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Update The Swarm Method for this team", size: 22 })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 250 },
        shading: { fill: COLORS.light, type: ShadingType.CLEAR },
        indent: { left: 400, right: 400 },
        children: [new TextRun({ text: "Rule: The system must evolve. You have explicit permission to change or drop anything that isn't working.", italics: true, size: 22 })]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== STAKEHOLDER COMMUNICATION ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Stakeholder Communication")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Swarm teams move fast internally. External stakeholders need a different interface.", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Translation Problem")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Internally, you're running 5 experiments and killing 3. Externally, stakeholders see chaos unless you translate. The Convergence includes stakeholder synthesis for this reason.", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("What Stakeholders Need")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Progress toward outcomes", bold: true, size: 22 }),
          new TextRun({ text: " — not experiment counts", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Decisions made and why", bold: true, size: 22 }),
          new TextRun({ text: " — not the full exploration tree", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "What's changing and what's stable", bold: true, size: 22 }),
          new TextRun({ text: " — not the daily pivots", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "When they'll see results", bold: true, size: 22 }),
          new TextRun({ text: " — not the internal timeline", size: 22 })
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Communication Cadence")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Weekly: ", bold: true, size: 22 }),
          new TextRun({ text: "Brief update from Convergence synthesis (async, written)", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Milestone: ", bold: true, size: 22 }),
          new TextRun({ text: "Show the winning result, not all the attempts", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Direction change: ", bold: true, size: 22 }),
          new TextRun({ text: "Proactive communication when a major approach is killed or pivoted", size: 22 })
        ]
      }),

      // ========== PAGE BREAK ==========
      new Paragraph({ children: [new PageBreak()] }),

      // ========== QUICK REFERENCE ==========
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Quick Reference")]
      }),
      new Paragraph({ spacing: { after: 200 } }),

      // Manifesto Box
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [9360],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
                margins: { top: 150, bottom: 150, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "THE SWARM MANIFESTO", bold: true, size: 28, color: COLORS.white })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100 },
                    children: [new TextRun({ text: "Attempts over perfection", size: 22, color: COLORS.white })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "Validated outcomes over activity metrics", size: 22, color: COLORS.white })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "Parallel exploration over sequential planning", size: 22, color: COLORS.white })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "Compounding systems over one-time solutions", size: 22, color: COLORS.white })]
                  })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 200 } }),

      // Four Laws
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Four Laws")]
      }),
      new Paragraph({
        numbering: { reference: "principles", level: 0 },
        children: [
          new TextRun({ text: "Attempts Over Perfection", bold: true, size: 22 }),
          new TextRun({ text: " — 10 experiments > 1 perfect attempt", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "principles", level: 0 },
        children: [
          new TextRun({ text: "Humans for Direction, Agents for Distance", bold: true, size: 22 }),
          new TextRun({ text: " — what/why vs. how", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "principles", level: 0 },
        children: [
          new TextRun({ text: "Rigor Scales With Volume", bold: true, size: 22 }),
          new TextRun({ text: " — more spawns = sharper kill criteria", size: 22 })
        ]
      }),
      new Paragraph({
        numbering: { reference: "principles", level: 0 },
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Compound or Decay", bold: true, size: 22 }),
          new TextRun({ text: " — templates > one-time solutions", size: 22 })
        ]
      }),

      // Eight Tenets
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Eight Tenets")]
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4680, 4680],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 50, bottom: 50, left: 0, right: 100 },
                width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Intent Over Instruction", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Parallel by Default", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Context is Currency", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Small Bets, Fast Funerals", size: 20 })] }),
                ]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 50, bottom: 50, left: 100, right: 0 },
                width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Humans Hold the Why", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Mastery Through Direction", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Ship the Learning", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Humans Rest, Agents Run", size: 20 })] }),
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 200 } }),

      // Swarm Cycle
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Swarm Cycle")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "SPAWN", bold: true, color: COLORS.primary, size: 22 }),
          new TextRun({ text: " → ", size: 22 }),
          new TextRun({ text: "SWARM", bold: true, color: COLORS.secondary, size: 22 }),
          new TextRun({ text: " → ", size: 22 }),
          new TextRun({ text: "SELECT", bold: true, color: COLORS.accent, size: 22 }),
          new TextRun({ text: " → ", size: 22 }),
          new TextRun({ text: "SCALE", bold: true, color: COLORS.dark, size: 22 }),
          new TextRun({ text: " → (repeat)", size: 22 })
        ]
      }),

      // Artifacts & Ceremonies side by side
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4680, 4680],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.SINGLE, size: 1, color: COLORS.gray } },
                margins: { top: 50, bottom: 50, left: 0, right: 150 },
                width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "The Five Artifacts", bold: true, size: 24, color: COLORS.secondary })] }),
                  new Paragraph({ spacing: { before: 100 }, numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Context Vault", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Agent Roster", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Velocity Log", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Intent Brief", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Template Library", size: 20 })] }),
                ]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                margins: { top: 50, bottom: 50, left: 150, right: 0 },
                width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "The Five Ceremonies", bold: true, size: 24, color: COLORS.secondary })] }),
                  new Paragraph({ spacing: { before: 100 }, numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Swarm Launch (daily)", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Convergence (weekly)", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Funeral (as needed)", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Handoff (at transitions)", size: 20 })] }),
                  new Paragraph({ numbering: { reference: "principles", level: 0 }, children: [new TextRun({ text: "Calibration (quarterly)", size: 20 })] }),
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({ spacing: { after: 300 } }),

      // Closing
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [9360],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: COLORS.light, type: ShadingType.CLEAR },
                borders: { 
                  top: { style: BorderStyle.SINGLE, size: 8, color: COLORS.accent },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: COLORS.accent },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                margins: { top: 200, bottom: 200, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "You're no longer paid to execute.", size: 24, color: COLORS.dark })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "You're paid to direct, judge, and synthesize.", size: 24, bold: true, color: COLORS.primary })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 150 },
                    children: [new TextRun({ text: "The teams that maximize quality attempts will build what used to take years in months.", size: 22, italics: true, color: COLORS.gray })]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100 },
                    children: [new TextRun({ text: "Swarm the solution.", bold: true, size: 24, color: COLORS.accent })]
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
  fs.writeFileSync("/sessions/eager-amazing-newton/mnt/Antigravity/The-Swarm-Method-v2.docx", buffer);
  console.log("Document created: The-Swarm-Method-v2.docx");
});
