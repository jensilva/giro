import {Request, Response} from 'express';

import {prisma} from '../models/prisma.js';

export const getTeams = async (req: Request, res: Response) => {
  const includeMembers = req.query.includeMembers === 'true';
  const teams = await prisma.team.findMany({
    include: includeMembers ? { members: true } : undefined
  });

  res.json(teams);
}

export const getTeam = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const team = await prisma.team.findUnique({
    where: { id },
    include: { members: true, projects: true }
  });

  if (team) {
    const projects = team.projects.map(project => project.id);
    const members = team.members.map(member => member.id);

    res.json({ ...team, projects, members});
  } else {
    res.status(404).json({ message: 'Team not found' });
  }

}

export const createTeam = async (req: Request, res: Response) => {
  const { name, description, members, projects } = req.body;
  const newTeam = await prisma.team.create({
    data: {
      name,
      description,
      members: {
        connect: members.map((memberId: number) => ({ id: memberId }))
      },
      projects: {
        connect: projects.map((projectId: number) => ({ id: projectId }))
      }
    },
    include: { members: true, projects: true }
  });

  res.status(201).json(newTeam);
}

export const updateTeam = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, members, projects } = req.body;

  try {
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name,
        description,
        members: {
          set: members.map((memberId: number) => ({ id: memberId }))
        },
        projects: {
          set: projects.map((projectId: number) => ({ id: projectId }))
        }
      },
      include: { members: true, projects: true }
    });

    res.json(updatedTeam);
  } catch (error) {
    res.status(404).json({ message: 'Team not found' });
  }
}

export const deleteTeam = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    await prisma.team.delete({
      where: { id }
    });
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: 'Team not found' });
  }
}
