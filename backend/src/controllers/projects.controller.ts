import { Request, Response } from 'express';

import { prisma } from '../models/prisma.js';

export const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: {
      manager: {
        select: { name: true }
      }
    }
  });
  res.json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: { teams: { select: { id: true } } }
  });

  if (project) {
    const teams = project.teams.map(team => team.id);
    res.json({ ...project, teams });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
}

export const createProject = async (req: Request, res: Response) => {
  const { name, description, startDate, endDate, status, managerId, teams } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status,
        managerId: managerId || null,
        teams: {
          connect: teams.map((teamId: number) => ({ id: teamId }))
        }
      }
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
}

export const editProject = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {name, description, startDate, endDate, status, managerId, teams} = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: {id: Number(id)},
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status,
        managerId: managerId || null,
        teams: {
          set: teams.map((teamId: number) => ({id: teamId}))
        }
      }
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error editing project', error });
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
}

export const getMyProjects = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?.id;
  // @ts-ignore
  const isAdmin = req.user?.role === 'ADMIN';

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const projects = await prisma.project.findMany({
      where: isAdmin
        ? undefined
        : {
          OR: [
            { managerId: userId },
            { teams: { some: { members: { some: { id: userId } } } } }
          ]
        },
      include: {
        teams: { select: { id: true, name:true, members: { select: { name: true } } } },
      }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user projects', error });
  }
}

