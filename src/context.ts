import { PrismaClient } from '@prisma/client';
import express from 'express';

export interface Context {
  prisma: PrismaClient;
  req: express.Request;
  currentUser: { id: number } | undefined;
}
