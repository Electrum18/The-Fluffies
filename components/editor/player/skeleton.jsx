import { useGLTF } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Skeleton as CreateSkeleton } from "three";
import shallow from "zustand/shallow";

import useResources from "@/helpers/resources";

const selector = (state) => [state.skeleton, state.setSkeleton];

function getAllBonesFromTree(bone) {
  const bonesList = [];

  if (bone.type === "Bone") bonesList.push(bone);

  if (bone.children.length > 0) {
    for (const boneIn of bone.children) {
      bonesList.push(...getAllBonesFromTree(boneIn));
    }
  }

  return bonesList;
}

export default function Skeleton() {
  const { nodes } = useGLTF(`/models/Main.glb`, "/draco-gltf/");

  const [skeleton, setSkeleton] = useResources(selector, shallow);
  const [boneTree, setBoneTree] = useState();

  useEffect(() => {
    if (nodes.Pelvis) setBoneTree(nodes.Pelvis.clone());
  }, [nodes.Pelvis]);

  useEffect(() => {
    if (skeleton.bones.length < 1 && boneTree) {
      const { boneInverses } = nodes.Body.skeleton;
      const list = getAllBonesFromTree(boneTree);

      setSkeleton(new CreateSkeleton(list, boneInverses));
    }
  }, [boneTree, nodes.Body.skeleton, setSkeleton, skeleton.bones.length]);

  return boneTree ? <primitive object={boneTree} /> : null;
}
