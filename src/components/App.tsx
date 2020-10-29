import React from 'react';
import { ThreeAR } from './ThreeAR/ThreeAR';
import * as THREE from 'three';

window.THREE = THREE;

export const App = () => {
  return <ThreeAR />;
};
