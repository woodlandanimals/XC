const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, PageBreak, ExternalHyperlink } = require('docx');
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
        run: { font: "Georgia", size: 24 }
      } 
    },
    paragraphStyles: [
      { 
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 56, bold: true, font: "Georgia", color: COLORS.dark },
        paragraph: { spacing: { before: 400, after: 300 }, outlineLevel: 0 }
      },
      { 
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Georgia", color: COLORS.dark },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 1 }
      },
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 }
      }
    },
    children: [
      // Title
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("After 20 Years in Product, I Finally Feel Like We're Working the Way We Should")]
      }),
      
      // Subtitle/byline
      new Paragraph({
        spacing: { after: 400 },
        children: [new TextRun({ text: "How agent-enabled teams are making me rethink everything I thought I knew about velocity", italics: true, size: 26, color: COLORS.gray })]
      }),

      // Opening
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "I've been building products for two decades. I survived the waterfall-to-agile transition. I've run feature teams and empowered teams. I've done startups where we shipped daily and enterprises where we shipped quarterly. I thought I'd seen every flavor of how teams can work.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "I was wrong.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "What I'm watching happen right now—in the teams I advise, in the communities I'm part of, in my own work—is the most fundamental shift in how software gets built since the Agile Manifesto. And it's not just about AI writing code. It's about a completely different relationship between humans and work.", size: 24 })]
      }),

      // Section 1
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Moment I Knew Everything Had Changed")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Last month, I watched a three-person startup team ship what would have taken my old 12-person team a quarter to build. They did it in two weeks.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "They weren't working longer hours. They weren't cutting corners. They were working ", size: 24 }),
        new TextRun({ text: "differently", italics: true, size: 24 }),
        new TextRun({ text: ".", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Here's what I observed: instead of planning a single approach and executing it carefully, they spawned five different experiments simultaneously. Each team member directed multiple AI agents working in parallel. They'd check in on results, kill the approaches that weren't working, and double down on the ones that were.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "It looked chaotic. It felt like watching someone play chess on five boards at once. But the results were undeniable.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "This pattern is showing up everywhere. Software engineer Simon Willison has been posting about \"embracing the parallel coding agent lifestyle\"—running multiple Claude Code or Codex instances simultaneously, sometimes in the same repo, sometimes against multiple git worktrees. What used to be a solo developer debugging one approach is now a human directing a swarm of attempts.", size: 24 })]
      }),

      // Section 2
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Old Bottleneck Is Gone. There's a New One.")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "For twenty years, the bottleneck was labor. We didn't have enough hands to build everything we wanted to build. So we optimized for efficiency: careful planning, minimal waste, get it right the first time.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "That made sense when every attempt was expensive.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "But the cost of attempting just dropped by 10x. Claude Code can maintain coherence through 30+ hour complex coding workflows. Cursor's December 2025 updates let you use visual sliders to change page elements directly in the IDE. OpenAI's Codex lets you deploy multiple agents to independently handle coding tasks in parallel.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The new bottleneck isn't labor. It's ", size: 24 }),
        new TextRun({ text: "knowing what's worth building", bold: true, size: 24 }),
        new TextRun({ text: " and ", size: 24 }),
        new TextRun({ text: "evaluating results fast enough", bold: true, size: 24 }),
        new TextRun({ text: " to capitalize on the velocity.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "This requires a complete mental model shift. The winning strategy isn't better planning—it's better swarming.", size: 24 })]
      }),

      // Section 3
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("What the Best Teams Are Doing Differently")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "After observing dozens of high-performing agent-enabled teams, I've noticed they share a set of principles that break from traditional agile thinking:", size: 24 })]
      }),

      // Principle 1
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "1. Attempts over perfection", bold: true, size: 26 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "They've internalized that the team running 10 experiments beats the team perfecting 1. When I asked one founder how they decide which approach to take, she laughed: \"We don't. We try all of them and see what works.\"", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "This matches what The Pragmatic Engineer reported: developers are increasingly \"programming by kicking off parallel AI agents,\" treating experiments as cheap and evaluation as the real skill.", size: 24 })]
      }),

      // Principle 2
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "2. Discover before you deliver", bold: true, size: 26 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The best teams aren't just swarming on solutions—they're swarming on discovery. They validate that the problem is real before they invest in building. One team I work with runs \"discovery experiments\" and \"delivery experiments\" in parallel: testing whether customers want something while simultaneously testing whether they can build it.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The fastest swarm in the wrong direction is still lost.", size: 24, italics: true })]
      }),

      // Principle 3
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "3. Fast funerals", bold: true, size: 26 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "High-velocity teams have formalized the act of killing experiments. They define success criteria ", size: 24 }),
        new TextRun({ text: "before", italics: true, size: 24 }),
        new TextRun({ text: " launching, evaluate ruthlessly, and celebrate when they kill something fast because it means they learned fast.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "As one engineering lead told me: \"We have a 15-minute ceremony we call 'The Funeral.' We state what we tried, why it didn't work, extract the learnings, and move on. No mourning. No sunk cost fallacy.\"", size: 24 })]
      }),

      // Principle 4
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "4. Context is currency", bold: true, size: 26 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The teams moving fastest have externalized everything. They maintain what they call a \"Context Vault\"—a single source of truth that any agent or human can query to understand the project state.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "This matters because, as a TechTarget analysis noted, \"agents learn from your codebase the way a new team member would—picking up naming conventions, preferred libraries, documentation style. But the agent doesn't learn ", size: 24 }),
        new TextRun({ text: "why", italics: true, size: 24 }),
        new TextRun({ text: " your team does things a certain way.\" The teams that externalize context have agents that ramp up instantly.", size: 24 })]
      }),

      // Principle 5
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [new TextRun({ text: "5. Compound or decay", bold: true, size: 26 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Every time these teams solve a problem, they ask: \"How do we make sure we never solve this problem again?\" Successful experiments become templates. Agent prompts that work get documented. The team builds systems that build systems.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Velocity compounds. Teams that don't do this find themselves running fast but never getting faster.", size: 24 })]
      }),

      // Section 4
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("What This Means for Agile")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "I'm not going to declare agile \"dead\"—that take is lazy and wrong. The principles of responding to change, delivering working software, and collaborating with customers are more relevant than ever.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "But the ", size: 24 }),
        new TextRun({ text: "practices", italics: true, size: 24 }),
        new TextRun({ text: " need to evolve. Two-week sprints made sense when two weeks was how long it took to build something worth testing. When you can spawn five experiments in an afternoon, the sprint cadence isn't the constraint anymore.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "What I'm seeing emerge is something I've started calling \"The Swarm Method\"—a framework built for agent-enabled teams that keeps the best of agile (customer focus, iteration, adaptation) while acknowledging the new reality of abundant agent labor.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The core insight: you're no longer paid to execute. You're paid to direct, judge, and synthesize. The teams that internalize this fastest will build what used to take years in months.", size: 24 })]
      }),

      // Section 5
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("The Risk No One's Talking About")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Here's what worries me: teams adopting agent velocity without agent rigor.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Research is already showing that rapid AI-assisted code generation can lead to technical debt and reduced understanding. TechTarget's analysis was blunt: \"AI is an amplifier of existing technical and organizational disciplines, not a substitute for them. Organizations without strong foundations will simply generate chaos quicker.\"", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The more you spawn, the sharper your kill criteria must be. Volume without evaluation rigor produces noise, not signal. Fast funerals require clear autopsies.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "And perhaps most importantly: agents can summarize customer feedback, but they can't replace direct customer contact. Teams that swarm without staying connected to real problems will build the wrong thing faster than ever before.", size: 24 })]
      }),

      // Closing
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("What Comes Next")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "Gartner predicts 40% of enterprise applications will embed AI agents by the end of 2026. By 2028, nearly 40% of organizations will have AI agents as team members within human teams.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The shift isn't coming. It's here.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "After twenty years of optimizing for efficiency with scarce labor, we're entering an era of optimizing for learning with abundant agents. The teams that figure this out first will have a structural advantage that compounds over time.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "For the first time in my career, I feel like the tooling has caught up to what we always wanted to do: try more things, learn faster, and focus our human attention on the problems that actually need human judgment.", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 400 },
        children: [new TextRun({ text: "We finally get to work the way we should.", size: 24 })]
      }),

      // Divider
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "—", size: 28, color: COLORS.gray })]
      }),

      // CTA
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "If you're experimenting with agent-enabled workflows, I'd love to hear what's working and what isn't. The patterns are still emerging, and we're all learning together.", italics: true, size: 22 })]
      }),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/eager-amazing-newton/mnt/Antigravity/Swarm-Method-Blog-Post.docx", buffer);
  console.log("Blog post created: Swarm-Method-Blog-Post.docx");
});
