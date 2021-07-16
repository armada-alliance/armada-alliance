---
template: AAIPDetailPage
title: "AAIP 1: The AAIP Process"
identities: 
    - id: sublayerio
      role: author
---

## Abstract 

An Armada Alliance Improvement Proposal (AAIP) is a formalized design document for the Armada Alliance community, providing information or describing a new feature for the Armada Alliance, its processes, or environment in a concise and technically sufficient manner. In this AAIP we describe what a AAIP is, how the AAIP process functions, and how users should go about proposing, discussing and structuring a AAIP.

The Armada Alliance intends AAIPs to be the primary mechanisms for proposing new features, collecting community input on an issue, and for documenting design decisions that have gone into the Armada Alliance. Because the AAIPs are maintained as text files in a versioned repository, their revision history is the historical record of the feature proposal.

## Specification

### AAIP types

There are three kinds of AAIP:

- **A Standards Track AAIP** — describes any change that affects most or all Armada Alliance implementations, such as a change to the website, a change in rules of operating a stake pool, or any change or addition that affects the way members of the Armada Alliance operate. Standards Track AAIP consist of two parts, a design document and a reference implementation.

- **A Process AAIP** — describes a process surrounding the Armada Alliance, or proposes a change to (or an event in) a process. Process AAIPs are like Standards Track AAIP but apply to areas other than the Armada Alliance codebase itself. They may propose an implementation, but not to the Armada Alliance codebase; they often require community consensus; unlike Informational AAIPs, they are more than recommendations, and users are typically not free to ignore them. Examples include procedures, guidelines, changes to the decision-making process, and changes to the tools or environment used in Armada Alliance development. Any meta-AAIP is also considered a Process AAIP.

- **An Informational AAIP** — describes a Cardano design issue, or provides general guidelines or information to the Armada Alliance community, but does not propose a new feature. Informational AAIPs do not necessarily represent an Armada Alliance community consensus or recommendation, so users and implementors are free to ignore Informational AAIPs or follow their advice.

### AAIP format and structure

AAIPs should be written in [Markdown](https://guides.github.com/features/mastering-markdown/) format. Each AAIP should have the following parts:

| Name | Description |
| --- | --- |
| Preamble | Headers containing metadata about the AAIP ([see below](#AAIP-header-preamble)). |
| Abstract | A short (\~200 word) description of the technical issue being addressed. |
| Motivation | The motivation is critical for AAIPs that want to change the Cardano protocol. It should clearly explain why the existing protocol is inadequate to address the problem that the AAIP solves. |
| Specification | The technical specification should describe the syntax and semantics of any new feature. The specification should be detailed enough. |
| Rationale | The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work. The rationale should provide evidence of consensus within the community and discuss important objections or concerns raised during discussion.|
| Backwards compatibility | All AAIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The AAIP must explain how the author proposes to deal with these incompatibilities.|
| Reference implementation | The reference implementation must be completed before any AAIP is given status "Active", but it need not be completed before the AAIP is accepted. It is better to finish the specification and rationale first and reach consensus on it before writing code. The final implementation must include test code and documentation appropriate for the Armada Alliance codebase.|
| Copyright | The AAIP must be explicitly licensed under acceptable copyright terms ([see below](#AAIP-licensing)).|

### AAIP Workflow

A AAIP begins as an idea about how to improve the Armada Alliance codebase or its surrounding processes, with one or more individuals who are willing to propose and discuss the idea with the Armada Alliance community. After initial discussion and feedback, the idea is then formalized into a properly formatted proposal and submitted as a pull request to the AAIP repository. The resulting new Draft AAIP is then publicly processed and progressed as follows:  

![AAIP Flow](https://armada-alliance.com/assets/AAIP_Flow.png)


#### AAIP statuses

| Status   | Description                                                                                                                    |
| ---      | ---                                                                                                                            |
| Draft    | The idea has been formally accepted in the repository, and is being worked on by its authors.                                  |
| Proposed | A working implementation exists, as well as a clear plan highlighting what is required for this AAIP to transition to "Active". |
| Active   | The proposal is deemed to have met all the appropriate criterias to be considered Active.                                      |
| On Hold  | The AAIP author is not currently working on this effort.                                                                        |
| Obsolete | The AAIP was either retired or made obsolete by a newer AAIP.                                                                    |
| Rejected | There is some issue with the AAIP that makes it not acceptable at this point.                                                   |
